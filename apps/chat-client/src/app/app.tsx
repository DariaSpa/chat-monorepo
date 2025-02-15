import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CreateRoomPage } from './pages/CreateRoomPage/CreateRoomPage';
import { ChatPage } from './pages/ChatPage/ChatPage';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CreateRoomPage />} />
        <Route path='/chat/:roomId' element={<ChatPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
