import { Server, Socket } from "socket.io";

export default function registerSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("sendMessage", (message) => {
      console.log("💬 Message:", message);
      // Aqui você poderia salvar no banco antes de emitir
      io.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });
}