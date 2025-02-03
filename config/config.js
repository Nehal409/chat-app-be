import dotenv from "dotenv";
dotenv.config();

const config = {
  port: Number(process.env.PORT) || 5001,
  environment: String(process.env.NODE_ENV) || "development",
  logLevel: String(process.env.LOG_LEVEL),
  frontendUrl: String(process.env.FRONTEND_URL),
  db: {
    uri: String(process.env.MONGODB_URI),
  },
  jwt: {
    secret: String(process.env.JWT_SECRET),
    expiry: String(process.env.JWT_EXPIRES_IN),
  },
  cloudinary: {
    cloudName: String(process.env.CLOUDINARY_CLOUD_NAME),
    apiSecret: String(process.env.CLOUDINARY_API_SECRET),
    apiKey: String(process.env.CLOUDINARY_API_KEY),
  },
};

export default config;
