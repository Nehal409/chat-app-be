import mongoose from "mongoose";
import config from "../../config/config.js";
import logger from "../utils/logger.js";
import { MESSAGES } from "../constants/messages.js";

const {
  db: { uri: dbUri },
} = config;

// Function to establish the database connection
const connectDB = async () => {
  const conn = await mongoose.connect(dbUri);
  logger.info(
    `${MESSAGES.DATABASE.CONNECTION_SUCCESS}: ${conn.connection.host}`
  );
};

// Export the connection function and mongoose for model access
export { connectDB, mongoose };
