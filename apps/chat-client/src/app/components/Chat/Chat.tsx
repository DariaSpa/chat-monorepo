import { useEffect, useRef, useState } from 'react';
import MessageTextbox from '../MessageTextbox/MessageTextbox';
import styles from './Chat.module.scss';
import Message from '../Message/Message';
import { useChatStore } from '../../store/chatStore';
import { useChatApi } from '../../api/useChatApi';
import { ChatEventType } from '@chat-monorepo/chat-api';

const Chat = () => {
  const { messages, userId } = useChatStore();
  const [message, setMessage] = useState('');
  const chatApiClient = useChatApi();
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatMessageRef = useRef<HTMLDivElement | null>(null);
  const prevMessagesLengthRef = useRef(messages.length);
  const [isUserAtBottom, setUserAtBottom] = useState(true);

  const handleSendMessage = () => {
    if (message.trim()) {
      chatApiClient.sendWebSocketMessage({
        type: ChatEventType.MESSAGE,
        userId,
        content: message,
      });
      setMessage('');
    }
  };

  const handleScroll = () => {
    if(!chatMessageRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatMessageRef.current;
    setUserAtBottom(scrollTop + clientHeight >= scrollHeight - 100);
  };

  useEffect(() => {
    if(messages.length > prevMessagesLengthRef.current && isUserAtBottom) {
      chatEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }
    prevMessagesLengthRef.current =messages.length;
  }, [messages, isUserAtBottom]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatMessagesWrapper}>
        <div
          className={styles.chatMessages}
          ref={chatMessageRef}
          onScroll={handleScroll}
        >
          {messages.map((msg) => (
            <Message key={msg.id} message={msg} userId={userId} />
          ))}
          <div ref={chatEndRef} />
          <button
            className={`${styles.scrollToBottomButton} ${!isUserAtBottom ? styles.show : ''}`}
            onClick={scrollToBottom}
          >
            &darr;
          </button>
        </div>
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
