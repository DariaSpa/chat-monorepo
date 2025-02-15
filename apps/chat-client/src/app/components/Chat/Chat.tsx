import { useState } from 'react';
import MessageTextbox from '../MessageTextbox/MessageTextbox';
import styles from './Chat.module.scss';
import Message from '../Message/Message';
import { useChatStore } from '../../store';
import { useChatApi } from '../../api/useChatApi';
import { ChatEventType } from '@chat-monorepo/chat-api';

const Chat = () => {
  const { messages, userId } = useChatStore();
  const [message, setMessage] = useState('');
  const chatApiClient = useChatApi();

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log(`[DEBUG] Sending message: ${message} from ${userId}`);
      chatApiClient.sendWebSocketMessage({
        type: ChatEventType.MESSAGE,
        userId,
        content: message,
      });
      setMessage('');
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatMessage}>
        {messages.map((msg) => (
          <Message 
            key={msg.id} 
            message={msg} 
            userId={userId} 
          />
        ))}
      </div>
      <div className={styles.inputContainer}>
        <MessageTextbox
          value={message}
          onChange={setMessage}
          placeholder='Message'
          showButton={message.trim().length > 0}
          onButtonClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
