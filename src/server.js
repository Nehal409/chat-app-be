import cors from "cors";
import express from "express";
import "express-async-errors"; // Ensures async error handling without try-catch
import helmet from "helmet";
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

const { port, environment } = config;
// Initialize Express app
const app = express();

// Parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());

// Global response middleware
app.use(responseMiddleware);

// Swagger API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Modular routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);

// Global Error-handling middleware
app.use(errorMiddleware);

// Start the server after establishing the DB connection
const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      logger.info(`Server is running on port ${port} in ${environment} mode`);
    });
  } catch (error) {
    logger.error(MESSAGES.DATABASE.CONNECTION_FAILED, error);
    process.exit(1); // Exit the process if DB connection fails
  }
};

startServer();
