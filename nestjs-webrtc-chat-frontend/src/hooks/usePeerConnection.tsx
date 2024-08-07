import { useMemo, useState } from 'react';
import { socket } from '../socket/socket';
import { useParams } from 'react-router-dom';

export function usePeerConnection(localStream: MediaStream) {
  const { roomName } = useParams();
  const [guestStream, setGuestStream] = useState<MediaStream | null>(null);

  // peerConnection 객체를 useMemo 훅을 사용하여 생성
  const peerConnection = useMemo(() => {
    // RTCPeerConnection 객체를 생성하고 STUN 서버를 설정
    const connection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun2.1.google.com:19302' }],
    });

    // ICE 후보 이벤트 리스너를 추가
    connection.addEventListener('icecandidate', ({ candidate }) => {
      // 후보가 있을 경우 socket을 통해 서버에 전송
      socket.emit('send_candidate', { candidate, roomName });
    });

    connection.addEventListener('track', ({ streams }) => {
      // 상대방의 스트림을 guestStream 상태로 설정
      setGuestStream(streams[0]);
    });

    // localStream의 각 트랙을 peerConnection에 추가
    localStream.getTracks().forEach((track) => {
      connection.addTrack(track, localStream);
    });

    return connection;
  }, [localStream, roomName]);

  return {
    peerConnection,
    guestStream,
  };
}
