import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "express-async-errors"; // Ensures async error handling without try-catch
import helmet from "helmet";

import errorMiddleware from "./middlewares/error.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000; // Use default port as a fallback
const app = express();

// Parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middlewares setup
app.use(cors());
app.use(helmet());

// Test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Test route is working!" });
});

// Error-handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
