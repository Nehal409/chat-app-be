import { Server } from "socket.io";
import config from "../../config/config.js";
import logger from "../utils/logger.js";

export const users = new Map(); // Store connected users
let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: config.frontendUrl,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    logger.info(`🔌 New connection: ${socket.id}`);

    const userId = socket.handshake.query.userId;
    if (userId) {
      handleUserJoin(socket, userId);
    }

    socket.on("sendMessage", (message) => handleSendMessage(message));
    socket.on("disconnect", () => handleUserDisconnect(socket));
  });

  return io;
};

// Function to get socket instance globally
export const getSocketInstance = () => io;

const handleUserJoin = (socket, userId) => {
  users.set(userId, socket.id);
  logger.info(`👤 User ${userId} connected with socket ID ${socket.id}`);

  io.emit("getOnlineUsers", Array.from(users.keys()));
};

const handleSendMessage = (message) => {
  const recipientSocketId = users.get(message.receiverId);
  if (recipientSocketId) {
    io.to(recipientSocketId).emit("receiveMessage", message);
  }
};

const handleUserDisconnect = (socket) => {
  let disconnectedUserId = null;

  for (const [userId, socketId] of users.entries()) {
    if (socketId === socket.id) {
      disconnectedUserId = userId;
      users.delete(userId);
      break;
    }
  }

  if (disconnectedUserId) {
    logger.info(`❌ User ${disconnectedUserId} disconnected`);
    io.emit("getOnlineUsers", Array.from(users.keys()));
  }
};
