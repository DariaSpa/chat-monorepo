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

export interface ChatRoom {
  id: string;
  name: string;
  users: Record<string, string>;
  messages: ChatMessage[];
}

export type EventCallback = (data: any) => void;

export enum ChatEventType {
  CONNECTED = 'connected',
  UPDATE = 'update',
  MESSAGE = 'message',
  EDIT = 'edit',
  DELETE = 'delete',
  LEAVE = 'leave',
  HEARTBEAT = 'heartbeat',
  ERROR = 'error',
  RECONNECTING = 'reconnecting',
  DISCONNECTED = 'disconnected',
}
