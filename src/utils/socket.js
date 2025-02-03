import { Server } from "socket.io";
import config from "../../config/config.js";
import logger from "../utils/logger.js";

const users = new Map(); // Store connected users

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: config.frontendUrl,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    logger.info(`🔌 New connection: ${socket.id}`);

    socket.on("join", (userId) => handleUserJoin(socket, userId));
    socket.on("sendMessage", (message) => handleSendMessage(io, message));
    socket.on("disconnect", () => handleUserDisconnect(socket));
  });

  return io;
};

// Handle user joining
const handleUserJoin = (socket, userId) => {
  users.set(userId, socket.id);
  logger.info(`👤 User ${userId} connected with socket ID ${socket.id}`);
};

// Handle message sending
const handleSendMessage = (io, message) => {
  const recipientSocketId = users.get(message.receiverId);
  if (recipientSocketId) {
    io.to(recipientSocketId).emit("receiveMessage", message);
  }
};

// Handle user disconnect
const handleUserDisconnect = (socket) => {
  for (const [userId, socketId] of users.entries()) {
    if (socketId === socket.id) {
      users.delete(userId);
      logger.info(`❌ User ${userId} disconnected`);
      break;
    }
  }
};
