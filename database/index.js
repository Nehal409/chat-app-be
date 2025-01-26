import mongoose from "mongoose";
import config from "../config/config.js";
import logger from "../src/utils/logger.js";
import { MESSAGES } from "../src/constants/messages.js";

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
