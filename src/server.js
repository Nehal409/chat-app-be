import cors from "cors";
import express from "express";
import "express-async-errors"; // Ensures async error handling without try-catch
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import config from "../config/config.js";
import swaggerSpec from "../config/swagger.js";
import { connectDB } from "./database/index.js";
import errorMiddleware from "./middlewares/error.js";
import responseMiddleware from "./middlewares/response.js";
import authRoutes from "./modules/auth/routes/auth.routes.js";
import logger from "./utils/logger.js";

// Initialize Express app
const app = express();

// Establish a connection to the database
connectDB();

// Parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware setup
app.use(cors());
app.use(helmet());

// Global response middleware
app.use(responseMiddleware);

// Swagger API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Modular routes
app.use("/api/v1/auth", authRoutes);

// Global Error-handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(config.port, () => {
  logger.info(
    `Server is running on port ${config.port} in ${config.environment} mode`
  );
});
