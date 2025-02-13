import React, { useState } from 'react';
import styles from './Message.module.scss';
import Input from '../Input/Input';
import Button from '../Button/Button';

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

  const formattedTime = new Date(message.timestamp).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleEdit = () => {
    console.log(`'message was edited: ${message.id}`)
    setIsEditing(false);
  };

  const handleDelete = () => {
    console.log(`'message was deleted: ${message.id}`)
  };

  return (
    <div className={`${styles.message} ${message.type === "bot" ? styles.botMessage : ""}`}>
      <div className={styles.messageInfo}>
        <strong className={styles.userName}>{message.userName}</strong>
        <div className={styles.time}>{formattedTime}</div>
      </div>
        {isEditing ? (
        <div className={styles.editWrapper}>
          <Input  placeholder="Edit your message..." value={newContent} onChange={setNewContent} />
          <Button onClick={handleEdit}>Save</Button>
        </div>
      ) : (
        <>
          <span style={{ textDecoration: message.isDeleted ? 'line-through' : 'none' }}>
            {message.content} {message.isEdited && '(edited)'}
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