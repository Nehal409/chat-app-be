import mongoose from "mongoose";
import config from "../../config/index.js";
import logger from "../utils/logger.js";
import { MESSAGES } from "../constants/messages.js";

const {
  db: { uri: dbUri },
} = config;

// Function to establish the database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbUri);
    logger.info(
      `${MESSAGES.DATABASE.CONNECTION_SUCCESS}: ${conn.connection.host}`
    );
  } catch (err) {
    logger.error(`${MESSAGES.DATABASE.CONNECTION_FAILED}: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

// Export the connection function and mongoose for model access
export { connectDB, mongoose };
