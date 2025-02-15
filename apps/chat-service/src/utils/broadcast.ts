import { WebSocketServer } from 'ws';
import { rooms } from '../models/room';

export const broadcast = (wss: WebSocketServer, roomId: string) => {
  const data = JSON.stringify({
    type: 'update',
    users: rooms[roomId]?.users || {},
    messages: rooms[roomId]?.messages.map(msg => ({
      ...msg,
      isEdited: msg.isEdited || false,
      isDeleted: msg.isDeleted || false,
    })),
  });

  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(data);
    }
  });
};
