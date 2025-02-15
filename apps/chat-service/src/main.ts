import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { API_ORIGIN, CLIENT_ORIGIN, config } from './config/env';
import roomRoutes from './routes/roomRoutes';
import { setupWebSocket } from './services/websocketService';

const app = express();

app.use(cors({ origin: CLIENT_ORIGIN }));

app.use(express.json());
app.use('/api', roomRoutes);

const server = app.listen(config.PORT, () => {
  console.log(`Server running on ${API_ORIGIN}`);
});

const wss = new WebSocketServer({ server });
setupWebSocket(wss);
