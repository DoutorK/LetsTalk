import express from "express";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./db";
import registerSocket from "./socket";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // o djabo do frontend
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("LiveChat API is running 🚀");
});

// Conecta com o Banco
connectDB();

// Configurar sockets
registerSocket(io);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});