import { ChatMessage, EventCallback, ChatEventType } from './types';

class ChatApiClient {
  private API_URL: string;
  private WS_URL: string;
  private ws: WebSocket | null = null;
  private isReady = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 3000;
  private heartbeatInterval: number | null = null;
  private eventCallbacks: Record<string, EventCallback[]> = {};
  private pendingMessages: { type: ChatEventType; userId?: string; content?: string; messageId?: string }[] = [];
  public randomId: string = Math.random().toString(36).substring(7);

  constructor(host: string, port: string, ssl: boolean) {
    const protocol = ssl ? 'https' : 'http';
    const wsProtocol = ssl ? 'wss' : 'ws';

    this.API_URL = `${protocol}://${host}:${port}/api`;
    this.WS_URL = `${wsProtocol}://${host}:${port}`;
  }

  async getMessages(): Promise<ChatMessage[]> {
    const res = await fetch(`${this.API_URL}/chat`);
    return res.json();
  }

  async sendMessage(userId: string, content: string): Promise<ChatMessage> {
    const res = await fetch(`${this.API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, content }),
    });
    return res.json();
  }

  async createRoom(roomName: string): Promise<{ roomId: string; roomName: string }> {
    const res = await fetch(`${this.API_URL}/create-room`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomName }),
    });

    if (!res.ok) {
      throw new Error(`Failed to create room: ${res.statusText}`);
    }

    return res.json();
  }

  connectWebSocket(roomId: string, userName: string) {
    if (this.ws) return;

    this.ws = new WebSocket(`${this.WS_URL}?room=${roomId}&name=${userName}`);
    this.isReady = false;

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.isReady = true;

      while (this.pendingMessages.length > 0) {
        const message = this.pendingMessages.shift();
        if (message) {
          this.sendWebSocketMessage(message);
        }
      }

      this.heartbeatInterval = window.setInterval(() => {
        this.sendWebSocketMessage({ type: ChatEventType.HEARTBEAT });
      }, 30000);
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type && this.eventCallbacks[data.type]) {
        this.eventCallbacks[data.type].forEach((callback) => callback(data));
      }
    };

    this.ws.onerror = (error) => {
      console.error('[ERROR] WebSocket encountered an error:', error);
      console.warn('[WARNING] Trying to reconnect...');
    };

    this.ws.onclose = () => {
      this.ws = null;
      this.isReady = false;

      if (this.heartbeatInterval) {
        clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = null;
      }

      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++;
          this.connectWebSocket(roomId, userName);
        }, this.reconnectInterval);
      } else {
        console.warn('[ERROR] Max reconnect attempts reached. WebSocket will not reconnect.');
      }
    };
  }

  disconnectWebSocket(roomId: string, userId: string) {
    if (this.ws) {
      this.sendWebSocketMessage({ type: ChatEventType.LEAVE, userId });

      setTimeout(() => {
        this.ws?.close();
        this.ws = null;
        this.isReady = false;
      }, 500);
    }
  }

  sendWebSocketMessage(message: { type: ChatEventType; userId?: string; content?: string; messageId?: string }) {
    if (!this.ws || this.ws.readyState === WebSocket.CONNECTING) {
      this.pendingMessages.push(message);
      return;
    }

    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('[ERROR] WebSocket is closed. Cannot send message.');
    }
  }

  on(eventType: ChatEventType, callback: EventCallback) {
    if (!this.eventCallbacks[eventType]) {
      this.eventCallbacks[eventType] = [];
    }
    this.eventCallbacks[eventType].push(callback);
  }

  off(eventType: ChatEventType, callback: EventCallback) {
    this.eventCallbacks[eventType] = this.eventCallbacks[eventType]?.filter((cb) => cb !== callback);
  }
}

let chatApiClientInstance: ChatApiClient | null = null;

export function getChatApiClient(host: string, port: string, ssl: boolean): ChatApiClient {
  if (!chatApiClientInstance) {
    chatApiClientInstance = new ChatApiClient(host, port, ssl);
  }
  return chatApiClientInstance;
}