import React, { useState } from 'react';
import { ChatEventType } from '@chat-monorepo/chat-api';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useChatApi } from '../../api/useChatApi';
import styles from './Message.module.scss';

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: number;
  type?: 'bot' | 'user';
  isEdited?: boolean;
  isDeleted?: boolean;
}

export interface MessageProps {
  message: ChatMessage;
  userId: string;
}

const Message: React.FC<MessageProps> = ({ message, userId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(message.content);
  const chatApiClient = useChatApi();

  const formattedTime = new Date(message.timestamp).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleEdit = () => {
    if (!newContent.trim()) return;
    
    chatApiClient.sendWebSocketMessage({
      type: ChatEventType.EDIT,
      messageId: message.id,
      content: newContent,
      userId,
    });
  
    setIsEditing(false);
  };
  
  const handleDelete = () => {
    chatApiClient.sendWebSocketMessage({
      type: ChatEventType.DELETE,
      messageId: message.id,
      userId,
    });
  };

  return (
    <div 
      className={`${styles.message} ${message.type === 'bot' ? styles.botMessage : ''} 
      ${message.isDeleted ? styles.deletedMessage : ''}`}
    >
      <div className={styles.messageInfo}>
        <strong className={styles.userName}>{message.userName}</strong>
        <div className={styles.time}>{formattedTime}</div>
      </div>
        {isEditing ? (
        <div className={styles.editWrapper}>
          <Input  placeholder='Edit your message...' value={newContent} onChange={setNewContent} />
          <Button onClick={handleEdit}>Save</Button>
        </div>
      ) : (
        <>
          <span>
            {message.content} {message.isEdited && !message.isDeleted && '(edited)'}
          </span>
          {message.userId === userId && !message.isDeleted && (
            <div className={styles.actions}>
              <Button variant={'secondary'} onClick={() => setIsEditing(true)}>Edit</Button>
              <Button variant={'secondary'} onClick={handleDelete}>Delete</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Message;