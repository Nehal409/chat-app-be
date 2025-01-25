import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 5001,
  environment: process.env.NODE_ENV || "development",
  logLevel: process.env.LOG_LEVEL || "info",
};

export default config;
