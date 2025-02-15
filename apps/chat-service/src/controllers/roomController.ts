import { Request, Response } from 'express';
import { createRoom } from '../services/roomService';

export const createRoomHandler = (req: Request, res: Response) => {
  const { roomName } = req.body;
  if (!roomName || !roomName.trim()) {
    return res.status(400).json({ error: 'Room name is required' });
  }

  const roomId = createRoom(roomName);
  if (!roomId) {
    return res.status(500).json({ error: 'Failed to create room' });
  }

  res.json({ roomId, roomName });
};
