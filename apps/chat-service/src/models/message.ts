import { ChatMessage } from '@chat-monorepo/chat-api';
import { generateUUID } from '../utils/uuid';

export const createMessage = (userId: string, userName: string, content: string): ChatMessage => ({
  id: generateUUID(),
  userId,
  userName,
  content,
  timestamp: Date.now(),
  isEdited: false,
  isDeleted: false,
});
