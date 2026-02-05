import { Socket } from "socket.io";

interface IDeviceConnection {
  connect(socket: Socket, userId: string): void;
  disconnect(socket: Socket, userId: string): void;
  notifyUser(userId: string, event: string, data: any): void;
}

class DeviceManager implements IDeviceConnection {
  private userSockets: Map<string, Socket[]> = new Map();

  connect(socket: Socket, userId: string): void {
    if (!this.userSockets.has(userId)) {
      this.userSockets.set(userId, []);
    }
    this.userSockets.get(userId)!.push(socket);
    console.log(`Dispositivo conectado para usuário ${userId}`);
  }

  disconnect(socket: Socket, userId: string): void {
    const sockets = this.userSockets.get(userId);
    if (sockets) {
      const index = sockets.indexOf(socket);
      if (index > -1) {
        sockets.splice(index, 1);
        if (sockets.length === 0) {
          this.userSockets.delete(userId);
        }
      }
    }
    console.log(`Dispositivo desconectado para usuário ${userId}`);
  }

  notifyUser(userId: string, event: string, data: any): void {
    const sockets = this.userSockets.get(userId);
    if (sockets) {
      sockets.forEach(socket => socket.emit(event, data));
    }
  }
}

export default DeviceManager;