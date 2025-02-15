import { ChatMessage } from '@chat-monorepo/chat-api';
import { rooms } from '../models/room';
import { generateUUID } from '../utils/uuid';

export const createRoom = (roomName: string): string | null => {
  if (!roomName.trim()) return null;

  const roomId = generateUUID();
  rooms[roomId] = { id: roomId, name: roomName, users: {}, messages: [] };
  return roomId;
};

export const addUserToRoom = (roomId: string, userId: string, userName: string): ChatMessage | null => {
  if (!rooms[roomId]) return null;

  rooms[roomId].users[userId] = userName;

  const joinMessage: ChatMessage = {
    id: generateUUID(),
    userId,
    userName,
    content: `${userName} has joined.`,
    timestamp: Date.now(),
    type: 'bot',
  };

  rooms[roomId].messages.push(joinMessage);
  return joinMessage;
};

export const removeUserFromRoom = (roomId: string, userId: string): void => {
  if (!rooms[roomId]) return;

  const leaveMessage: ChatMessage = {
    id: generateUUID(),
    userId,
    userName: rooms[roomId].users[userId],
    content: `${rooms[roomId].users[userId]} has left.`,
    timestamp: Date.now(),
    type: 'bot',
  };

  rooms[roomId].messages.push(leaveMessage);

  delete rooms[roomId].users[userId];
};
