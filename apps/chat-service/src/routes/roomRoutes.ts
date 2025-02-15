import express from 'express';
import { createRoomHandler } from '../controllers/roomController';

const router = express.Router();

router.post('/create-room', createRoomHandler);

export default router;
