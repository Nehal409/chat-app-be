import { unauthorized } from "@hapi/boom";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";

const {
  jwt: { expiry: jwtExpiresIn, secret: jwtSecret },
} = config;

export const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch {
    throw unauthorized("Invalid or expired token");
  }
};
