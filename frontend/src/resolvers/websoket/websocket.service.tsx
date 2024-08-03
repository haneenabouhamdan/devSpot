import { io, Socket } from 'socket.io-client';

interface MessagePayload {
  id: string;
  senderId: string;
  channelId: string;
  text: string;
  attachments?: string[];
  createdAt: string;
  sender: { username: string; profilePicture: string; phoneNumber: string };
  messageReactions: { emoji: string }[];
}

class WebSocketService {
  socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
      upgrade: false,
    });

    // Enable debugging
    this.socket.on('connect_error', err => {
      console.log('Connection Error: ', err.message);
    });

    this.socket.on('connect_timeout', () => {
      console.log('Connection Timeout');
    });

    this.socket.on('error', err => {
      console.log('Error: ', err.message);
    });

    this.socket.on('reconnect_failed', () => {
      console.log('Reconnection Failed');
    });
  }

  joinChannel(channelId: string) {
    this.socket.emit('joinChannel', { channelId });
  }

  sendMessage(message: MessagePayload) {
    this.socket.emit('msgToServer', message);
  }

  onMessage(callback: (message: MessagePayload) => void) {
    this.socket.on('msgToClient', callback);
  }

  onConnect(callback: () => void) {
    this.socket.on('connect', callback);
  }

  onDisconnect(callback: () => void) {
    this.socket.on('disconnect', callback);
  }
}

export default new WebSocketService();
