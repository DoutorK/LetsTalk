import { Server, Socket } from "socket.io";
import DeviceManager from "../services/DeviceMenager.ts"; 

const deviceManager = new DeviceManager(); 

export default function registerSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("🟢 User connected:", socket.id);

    const userId = socket.handshake.query.userId as string;
    if (!userId) {
      socket.disconnect();
      return;
    }

    deviceManager.connect(socket, userId);

    socket.on("sendMessage", (message) => {
      console.log("💬 Message:", message);
      deviceManager.notifyUser(userId, "receiveMessage", message);
    });

    socket.on("disconnect", () => {
      deviceManager.disconnect(socket, userId);
    });
  });
}