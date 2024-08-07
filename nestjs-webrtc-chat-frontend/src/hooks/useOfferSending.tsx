import { useCallback } from 'react';
import { socket } from '../socket/socket.tsx';
import { useParams } from 'react-router-dom';

// useOfferSending 훅 정의
export function useOfferSending(peerConnection: RTCPeerConnection) {
  const { roomName } = useParams();

  // sendOffer 함수를 useCallback 훅을 사용하여 정의
  const sendOffer = useCallback(async () => {
    const offer = await peerConnection.createOffer();
    // 로컬 설명을 offer로 설정
    await peerConnection.setLocalDescription(offer);

    // 서버에 offer와 roomName을 전송
    socket.emit('send_connection_offer', {
      roomName,
      offer,
    });
  }, [roomName, peerConnection]);

  return { sendOffer };
}
