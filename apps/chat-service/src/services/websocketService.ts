import { WebSocket, WebSocketServer } from 'ws';
import { ChatEventType } from '@chat-monorepo/chat-api';
import { addUserToRoom, removeUserFromRoom } from './roomService';
import { addMessage, editMessage, deleteMessage } from './messageService';
import { broadcast } from '../utils/broadcast';
import { generateUUID } from '../utils/uuid';
import { API_ORIGIN } from '../config/env';
import { rooms } from '../models/room';

export const setupWebSocket = (wss: WebSocketServer) => {
  wss.on('connection', (ws: WebSocket, req) => {
    const { searchParams } = new URL(req.url || '', API_ORIGIN);
    const roomId = searchParams.get('room');
    const userName = searchParams.get('name') || `User-${Math.random().toString(36).substring(7)}`;
    const userId = generateUUID();
    const roomName = rooms[roomId]?.name;

    ws.send(JSON.stringify({ type: ChatEventType.CONNECTED, userId, roomName }));

    if (!roomId) {
      ws.close();
      return;
    }
    
    const joinMessage = addUserToRoom(roomId, userId, userName);
    if (joinMessage) {
      broadcast(wss, roomId);
    }

    ws.on('message', (data) => {
      const { type, content, messageId } = JSON.parse(data.toString());

      if (type === ChatEventType.MESSAGE) {
        addMessage(roomId, userId, userName, content);
      } else if (type === ChatEventType.EDIT) {
        editMessage(roomId, messageId, userId, content);
      } else if (type === ChatEventType.DELETE) {
        deleteMessage(roomId, messageId, userId);
      }

      broadcast(wss, roomId);
    });

    ws.on('close', () => {
      removeUserFromRoom(roomId, userId);
      broadcast(wss, roomId);
    });
  });
};
