import { useParams, useSearchParams } from 'react-router-dom';
import Chat from '../../components/Chat/Chat';
import ChatUsersList from '../../components/ChatUsersList/ChatUsersList';
import Header from '../../components/Header/Header';
import { Tabs } from '../../components/Tabs/Tabs';
import styles from './ChatPage.module.scss';
import { useChatStore } from '../../store/chatStore';
import { useChatWebSocket } from '../../hooks/useChatWebSocket';

export const ChatPage = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const { users, roomName } = useChatStore();
  const user = searchParams.get('user');

  useChatWebSocket(roomId, user);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.headerWrapper}>
        <Header headerText={roomName} />
      </div>
      <Tabs participantsContent={<ChatUsersList items={users} />} chatContent={<Chat />} />
    </div>
  );
};
