import { useCallback } from 'react';

// useAnswerProcessing 훅 정의
export function useAnswerProcessing(peerConnection: RTCPeerConnection) {
  // handleOfferAnswer 함수를 useCallback 훅을 사용하여 정의
  const handleOfferAnswer = useCallback(
    ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      // answer를 사용하여 원격 설명을 설정
      peerConnection.setRemoteDescription(answer);
    },
    [peerConnection], // peerConnection이 변경될 때마다 새로운 콜백을 생성
  );

  return {
    handleOfferAnswer, // handleOfferAnswer 함수 반환
  };
}
