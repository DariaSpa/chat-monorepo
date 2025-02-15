import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ChatEventType } from '@chat-monorepo/chat-api';
import Chat from '../../components/Chat/Chat';
import ChatUsersList from '../../components/ChatUsersList/ChatUsersList';
import Header from '../../components/Header/Header';
import { Tabs } from '../../components/Tabs/Tabs';
import { useChatApi } from '../../api/useChatApi';
import { useChatStore } from '../../store';
import styles from './ChatPage.module.scss';

export const ChatPage = () => {
  const { roomId } = useParams();
  const [ searchParams ] = useSearchParams();
  const { users, userId, setMessages, setUsers, setUserId } = useChatStore();
  const [ connectionStatus, setConnectionStatus] = useState<'connected' | 'reconnecting' | 'disconnected'>('disconnected');
  const chatApiClient = useChatApi();

  const user = searchParams.get('user');
  const room = searchParams.get('room');

  useEffect(() => {
    if (!roomId || !user) {
      console.warn('[WARNING] Room and user are required.');
      return;
    }
    
    console.info(`[INFO] Connecting to WebSocket for room: ${roomId}`);

    chatApiClient.connectWebSocket(roomId, user);

    chatApiClient.on(ChatEventType.CONNECTED, (data) => {
      setUserId(data.userId);
      setConnectionStatus('connected');
      console.info(`[INFO] Connected as user ID: ${data.userId}`);
    });

    chatApiClient.on(ChatEventType.UPDATE, (data) => {
      setUsers(data.users);
      setMessages(data.messages);
    });

    chatApiClient.on(ChatEventType.RECONNECTING, () => {
      console.warn('[WARNING] WebSocket reconnecting...');
      setConnectionStatus('reconnecting');
    });

    chatApiClient.on(ChatEventType.DISCONNECTED, () => {
      console.warn('[WARNING] WebSocket disconnected.');
      setConnectionStatus('disconnected');
    });

    return () => {
      console.info('[INFO] Disconnecting WebSocket...');
      chatApiClient.disconnectWebSocket(roomId, userId);
    };
  }, [roomId, user, setMessages, setUsers, chatApiClient, setUserId, userId]);
 
  return (
    <div className={styles.chatContainer}>
      <div className={styles.headerWrapper}><Header headerText={room || 'Chat'} /></div>
      <Tabs
        participantsContent={<ChatUsersList items={users} />}
        chatContent={<Chat />} 
      />
    </div>
  )
};
