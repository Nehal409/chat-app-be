import { v2 as cloudinary } from "cloudinary";
import config from "../../config/config.js";

const {
  cloudinary: { apiKey, apiSecret, cloudName },
} = config;

// Configuration
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export default cloudinary;
