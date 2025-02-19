import { rooms } from '../models/room';

export const broadcast = (roomId: string) => {
  if (!rooms[roomId]) return;

  const data = JSON.stringify({
    type: 'update',
    users: rooms[roomId].users || {},
    messages: rooms[roomId].messages.map(msg => ({
      ...msg,
      isEdited: msg.isEdited || false,
      isDeleted: msg.isDeleted || false,
    })),
  });

  rooms[roomId].sockets.forEach((ws) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(data);
    }
  });
};