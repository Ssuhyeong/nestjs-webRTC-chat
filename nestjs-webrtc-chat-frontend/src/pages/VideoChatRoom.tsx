import { VideoFeed } from '../components/VideoFeed.tsx';
import { FunctionComponent } from 'react';
import { useChatConnection } from '../hooks/useChatConnection.tsx';
import { usePeerConnection } from '../hooks/usePeerConnection.tsx';

// localStream을 MediaStream으로 받음
interface Props {
  localStream: MediaStream;
}

export const VideoChatRoom: FunctionComponent<Props> = ({ localStream }) => {
  // usePeerConnection 훅을 호출하여 peerConnection과 guestStream을 가져옴
  const { peerConnection, guestStream } = usePeerConnection(localStream);

  // useChatConnection 훅을 호출하여 peerConnection을 사용
  useChatConnection(peerConnection);

  return (
    <div>
      <VideoFeed mediaStream={localStream} isMuted={true} />
      {guestStream && (
        <div>
          guest
          <VideoFeed mediaStream={guestStream} />
        </div>
      )}
    </div>
  );
};
