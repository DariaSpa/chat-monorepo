import { useEffect, useCallback } from 'react';
import { ChatEventType } from '@chat-monorepo/chat-api';
import { useChatStore } from '../store/chatStore';
import { useChatApi } from '../api/useChatApi';

export const useChatWebSocket = (roomId: string | undefined, user: string | null) => {
  const { setMessages, setUsers, setUserId, setRoomName } = useChatStore();
  const chatApiClient = useChatApi();

  const handleConnected = useCallback((data: { userId: string; roomName: string }) => {
    setUserId(data.userId);
    setRoomName(data.roomName);
  }, []);

  const handleUpdate = useCallback((data: { users: Record<string, string>; messages: any[] }) => {
    setUsers(data.users);
    setMessages(data.messages);
  }, []);

  useEffect(() => {
    if (!roomId || !user) {
      return;
    }

    chatApiClient.connectWebSocket(roomId, user);
    chatApiClient.on(ChatEventType.CONNECTED, handleConnected);
    chatApiClient.on(ChatEventType.UPDATE, handleUpdate);

    return () => {
      chatApiClient.disconnectWebSocket(roomId, user);
      chatApiClient.off(ChatEventType.CONNECTED, handleConnected);
      chatApiClient.off(ChatEventType.UPDATE, handleUpdate);
    };
  }, [roomId, user]);
};