import dotenv from "dotenv";
dotenv.config();

const config = {
  port: Number(process.env.PORT) || 5001,
  environment: String(process.env.NODE_ENV) || "development",
  logLevel: String(process.env.LOG_LEVEL),
  db: {
    uri: String(process.env.MONGODB_URI),
  },
};

export default config;
