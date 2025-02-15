import { ChatMessage } from '@chat-monorepo/chat-api';
import { rooms } from '../models/room';
import { generateUUID } from '../utils/uuid';

export const addMessage = (roomId: string, userId: string, userName: string, content: string): ChatMessage | null => {
  if (!rooms[roomId]) return null;

  const message: ChatMessage = {
    id: generateUUID(),
    userId,
    userName,
    content,
    timestamp: Date.now(),
    isEdited: false,
    isDeleted: false,
  };

  rooms[roomId].messages.push(message);
  return message;
};

export const editMessage = (roomId: string, messageId: string, userId: string, newContent: string): boolean => {
  const message = rooms[roomId]?.messages.find((m) => m.id === messageId && m.userId === userId);
  if (!message) return false;

  message.content = newContent;
  message.isEdited = true;
  return true;
};

export const deleteMessage = (roomId: string, messageId: string, userId: string): boolean => {
  const message = rooms[roomId]?.messages.find((m) => m.id === messageId && m.userId === userId);
  if (!message) return false;

  message.content = 'This message was deleted.';
  message.isDeleted = true;
  return true;
};
