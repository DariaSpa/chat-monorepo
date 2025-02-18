import { ChatMessage } from '@chat-monorepo/chat-api';
import { generateUUID } from './uuid';

export const createBotMessage = (content: string): ChatMessage => ({
  id: generateUUID(),
  userId: 'bot',
  userName: 'Meetingbot',
  content,
  timestamp: Date.now(),
  type: 'bot',
});
