import { unauthorized } from "@hapi/boom";
import { MESSAGES } from "../constants/messages.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw unauthorized(MESSAGES.AUTH.TOKEN_MISSING_OR_INVALID);
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user data from the token to the request
    next();
  } catch (error) {
    next(error);
  }
};
