import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CreateRoomPage } from './pages/CreateRoomPage/CreateRoomPage';
import { ChatPage } from './pages/ChatPage/ChatPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CreateRoomPage />} />
        <Route path='/chat/:roomId' element={<ChatPage />} /> 
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
