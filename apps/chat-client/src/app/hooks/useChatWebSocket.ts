import { useEffect, useCallback } from 'react';
import { ChatEventType } from '@chat-monorepo/chat-api';
import { useChatStore } from '../store/chatStore';
import { useChatApi } from '../api/useChatApi';

export const useChatWebSocket = (roomId: string | undefined, user: string | null) => {
  const { setMessages, setUsers, setUserId, setRoomName } = useChatStore();
  const chatApiClient = useChatApi();

  const handleConnected = useCallback(
    (data: { userId: string, roomName: string }) => {
      setUserId(data.userId);
      setRoomName(data.roomName);
    },
    [setUserId, setRoomName]
  );

  const handleUpdate = useCallback(
    (data: { users: Record<string, string>; messages: any[] }) => {
      setUsers(data.users);
      setMessages(data.messages);
    },
    [setMessages, setUsers]
  );

  const handleReconnecting = useCallback(() => {
    console.warn('[WARNING] WebSocket reconnecting...');
  }, []);

  const handleDisconnected = useCallback(() => {
    console.warn('[WARNING] WebSocket disconnected.');
  }, []);

  useEffect(() => {
    if (!roomId || !user) {
      console.warn('[WARNING] Room and user are required.');
      return;
    }

    console.info(`[INFO] Connecting to WebSocket for room: ${roomId}`);
    chatApiClient.connectWebSocket(roomId, user);

    chatApiClient.on(ChatEventType.CONNECTED, handleConnected);
    chatApiClient.on(ChatEventType.UPDATE, handleUpdate);
    chatApiClient.on(ChatEventType.RECONNECTING, handleReconnecting);
    chatApiClient.on(ChatEventType.DISCONNECTED, handleDisconnected);

    return () => {
      console.info('[INFO] Disconnecting WebSocket...');
      chatApiClient.disconnectWebSocket(roomId, user);
      chatApiClient.off(ChatEventType.CONNECTED, handleConnected);
      chatApiClient.off(ChatEventType.UPDATE, handleUpdate);
      chatApiClient.off(ChatEventType.RECONNECTING, handleReconnecting);
      chatApiClient.off(ChatEventType.DISCONNECTED, handleDisconnected);
    };
  }, [handleConnected, handleDisconnected, roomId, user]);
};
