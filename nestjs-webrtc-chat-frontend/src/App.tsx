import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { VideoChatRoom } from './pages/VideoChatRoom.tsx';
import { useLocalCameraStream } from './hooks/useLocalCameraStream.tsx';

export const App = () => {
  const { localStream } = useLocalCameraStream();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="video-chat-room/:roomName"
          element={localStream && <VideoChatRoom localStream={localStream} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
