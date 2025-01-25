import mongoose from "mongoose";
import config from "../../config/index.js";
import logger from "../utils/logger.js";

const {
  db: { uri: dbUri },
} = config;

// Function to establish the database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbUri);
    logger.info(
      `Connected to the database successfully: ${conn.connection.host}`
    );
  } catch (err) {
    logger.error(`Failed to connect to the database: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

// Export the connection function and mongoose for model access
export { connectDB, mongoose };
