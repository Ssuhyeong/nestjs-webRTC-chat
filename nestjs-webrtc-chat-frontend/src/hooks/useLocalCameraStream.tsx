import { useEffect, useState } from 'react';

// useLocalCameraStream 훅 정의
export function useLocalCameraStream() {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    // 사용자 미디어 장치에 접근하여 비디오와 오디오 스트림을 가져옴
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // 스트림을 localStream 상태로 설정
        setLocalStream(stream);
      });
  }, []); // 빈 배열을 두어 컴포넌트가 마운트될 때 한 번만 실행됨

  return {
    localStream, // localStream 상태 반환
  };
}
