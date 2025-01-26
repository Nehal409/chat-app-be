import dotenv from "dotenv";
dotenv.config();

const config = {
  port: Number(process.env.PORT) || 5001,
  environment: String(process.env.NODE_ENV) || "development",
  logLevel: String(process.env.LOG_LEVEL),
  db: {
    uri: String(process.env.MONGODB_URI),
  },
  jwt: {
    secret:String(process.env.JWT_SECRET),
    expiry:String(process.env.JWT_EXPIRES_IN),
  }
};

export default config;
