import cors from "cors";
import express from "express";
import "express-async-errors"; // Ensures async error handling without try-catch
import helmet from "helmet";
import { createServer } from "http";
import swaggerUi from "swagger-ui-express";
import config from "../config/config.js";
import swaggerSpec from "../config/swagger.js";
import { connectDB } from "../database/index.js";
import { MESSAGES } from "./constants/messages.js";
import errorMiddleware from "./middlewares/error.js";
import responseMiddleware from "./middlewares/response.js";
import authRoutes from "./modules/auth/routes/auth.routes.js";
import messageRoutes from "./modules/chat/routes/chat.routes.js";
import logger from "./utils/logger.js";
import { initializeSocket } from "./utils/socket.js";

const { port, environment } = config;

// Initialize Express app and HTTP server
const app = express();
const server = createServer(app);

// Middleware setup
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(helmet());

// Initialize Socket.io
initializeSocket(server);

// Global response middleware
app.use(responseMiddleware);

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);

// Global Error-handling middleware
app.use(errorMiddleware);

// Start the server
const startServer = async () => {
  try {
    await connectDB();
    server.listen(port, () => {
      logger.info(`Server running on port ${port} in ${environment} mode`);
    });
  } catch (error) {
    logger.error(`${MESSAGES.DATABASE.CONNECTION_FAILED}:`, error);
    process.exit(1);
  }
};

startServer();
