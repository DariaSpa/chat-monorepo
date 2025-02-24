import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useRoomNavigation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');

  const join = searchParams.get('join');

  useEffect(() => {
    if (join) {
      setRoomId(join);
    }
  }, [join]);

  const navigateToChat = () => {
    navigate(`/chat/${roomId}?user=${userName}`);
  };

  return { roomId, setRoomId, userName, setUserName, navigateToChat };
};