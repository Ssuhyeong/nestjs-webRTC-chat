import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { socket } from '../socket/socket.tsx';
import { useOfferSending } from './useOfferSending.tsx';
import { useSendingAnswer } from './useSendingAnswer.tsx';
import { useAnswerProcessing } from './useAnswerProcessing.tsx';

export function useChatConnection(peerConnection: RTCPeerConnection) {
  const { roomName } = useParams(); // URL에서 roomName 파라미터를 가져옵니다.

  const { sendOffer } = useOfferSending(peerConnection); // Offer를 보내는 훅 사용
  const { handleConnectionOffer } = useSendingAnswer(peerConnection); // Offer를 받는 훅 사용
  const { handleOfferAnswer } = useAnswerProcessing(peerConnection); // Answer를 처리하는 훅 사용

  const handleConnection = useCallback(() => {
    socket.emit('join_room', roomName); // 소켓을 통해 방에 조인
  }, [roomName]);

  const handleReceiveCandidate = useCallback(
    ({ candidate }: { candidate: RTCIceCandidate }) => {
      peerConnection.addIceCandidate(candidate); // ICE candidate 추가
    },
    [peerConnection],
  );

  useEffect(() => {
    socket.connect(); // 소켓 연결

    // 소켓 이벤트 핸들러 등록
    socket.on('answer', handleOfferAnswer);
    socket.on('send_connection_offer', handleConnectionOffer);
    socket.on('another_person_ready', sendOffer);
    socket.on('connect', handleConnection);
    socket.on('send_candidate', handleReceiveCandidate);

    return () => {
      // 컴포넌트 언마운트 시 소켓 이벤트 핸들러 해제
      socket.off('answer', handleOfferAnswer);
      socket.off('send_connection_offer', handleConnectionOffer);
      socket.off('another_person_ready', sendOffer);
      socket.off('connect', handleConnection);
      socket.off('send_candidate', handleReceiveCandidate);
    };
  }, [
    roomName,
    handleConnection,
    handleConnectionOffer,
    handleOfferAnswer,
    sendOffer,
    handleReceiveCandidate,
  ]);
}
