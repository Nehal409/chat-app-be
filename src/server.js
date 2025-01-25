import cors from "cors";
import express from "express";
import "express-async-errors"; // Ensures async error handling without try-catch
import helmet from "helmet";

import config from "../config/index.js";
import { connectDB } from "./database/index.js";
import errorMiddleware from "./middlewares/error.js";
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

// Test route
app.get("/", (req, res) => {
  logger.info("Test route accessed");
  res.status(200).json({ message: "Test route is working!" });
});

// Error-handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(config.port, () => {
  logger.info(
    `Server is running on port ${config.port} in ${config.environment} mode`
  );
});
