import { useState } from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';
import Input from '../Input/Input';
import styles from './Chat.module.scss';

const Chat = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    console.log(`message has sent (${message})`);
    setMessage('');
  }

  return (
    <div className={styles.container}>
      <ChatMessage />
      <Input
        value={message}
        onChange={setMessage}
        placeholder='Message'
        showButton={message.trim().length > 0}
        onButtonClick={handleSendMessage}
      />
    </div>
  );
}

export default Chat;
