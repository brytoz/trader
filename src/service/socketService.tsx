import { io, Socket } from "socket.io-client";

class WSService {
  private socket: Socket | null = null;

  initializeSocket(): void {
    if (this.socket) return; 

    try {
      this.socket = io(import.meta.env.VITE_REACT_APP_SOCKET, {
        transports: ["websocket"],
      });

      this.socket.on("connect", () => console.log('***** app connected to serverSocket'));
      this.socket.on("disconnect", () => console.warn('***** app disconnected to serverSocket'));
      this.socket.on("error", (error) => console.error("WebSocket Error:", error));
    } catch (error) {
      console.error("Failed to initialize WebSocket:", error);
    }
  }

  emit(event: string, data: Record<string, any> = {}): void {
    if (!this.socket) return console.error("WebSocket not initialized");
    this.socket.emit(event, data);
  }

  on(event: string, callback: (...args: any[]) => void): void {
    if (!this.socket) return console.error("WebSocket not initialized");
    this.socket.on(event, callback);
  }

  removeListener(event: string): void {
    if (!this.socket) return console.error("WebSocket not initialized");
    this.socket.off(event);
  }
}

const socketService = new WSService();
export default socketService;
