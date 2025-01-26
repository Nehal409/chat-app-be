import { unauthorized } from "@hapi/boom";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import { MESSAGES } from "../constants/messages.js";

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
    throw unauthorized(MESSAGES.AUTH.TOKEN_EXPIRED_OR_INVALID);
  }
};
