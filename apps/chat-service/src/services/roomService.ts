import { ChatMessage } from '@chat-monorepo/chat-api';
import { rooms } from '../models/room';
import { generateUUID } from '../utils/uuid';
import { createBotMessage } from '../utils/botMessage';

export const createRoom = (roomName: string): string | null => {
  if (!roomName.trim()) return null;

  const roomId = generateUUID();
  rooms[roomId] = { id: roomId, name: roomName, users: {}, messages: [] };
  return roomId;
};

export const addUserToRoom = (roomId: string, userId: string, userName: string): ChatMessage | null => {
  if (!rooms[roomId]) return null;

  rooms[roomId].users[userId] = userName;

  const joinMessage = createBotMessage(`${userName} joined.`);

  rooms[roomId].messages.push(joinMessage);
  return joinMessage;
};

export const removeUserFromRoom = (roomId: string, userId: string): void => {
  if (!rooms[roomId]) return;

  const leaveMessage = createBotMessage(`${rooms[roomId].users[userId]} left.`);

  rooms[roomId].messages.push(leaveMessage);

  delete rooms[roomId].users[userId];
};
