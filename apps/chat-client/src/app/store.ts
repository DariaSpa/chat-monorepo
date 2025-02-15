import { ChatMessage } from '@chat-monorepo/chat-api';
import { create } from 'zustand';

interface ChatState {
  messages: ChatMessage[];
  users: Record<string, string>;
  userId: string;
  setMessages: (messages: ChatMessage[]) => void;
  setUsers: (users: Record<string, string>) => void;
  setUserId: (userId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  users: {},
  userId: '',
  setMessages: (messages) => set({ messages }),
  setUsers: (users) => set({ users }),
  setUserId: (userId) => set({ userId }),
}));
