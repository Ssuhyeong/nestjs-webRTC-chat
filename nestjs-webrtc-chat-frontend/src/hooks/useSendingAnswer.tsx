import { useCallback } from 'react';
import { socket } from '../socket/socket.tsx';
import { useParams } from 'react-router-dom';

// useSendingAnswer 훅 정의
export function useSendingAnswer(peerConnection: RTCPeerConnection) {
  // URL 파라미터에서 roomName을 가져옴
  const { roomName } = useParams();

  // handleConnectionOffer 함수를 useCallback 훅을 사용하여 정의
  const handleConnectionOffer = useCallback(
    async ({ offer }: { offer: RTCSessionDescriptionInit }) => {
      // 원격 설명을 offer로 설정
      await peerConnection.setRemoteDescription(offer);
      // 로컬 설명을 위한 answer 생성
      const answer = await peerConnection.createAnswer();
      // 로컬 설명을 answer로 설정
      await peerConnection.setLocalDescription(answer);

      // 서버에 answer와 roomName을 전송
      socket.emit('answer', { answer, roomName });
    },
    [roomName, peerConnection], // roomName과 peerConnection이 변경될 때마다 새로운 콜백을 생성
  );

  return {
    handleConnectionOffer, // handleConnectionOffer 함수 반환
  };
}
