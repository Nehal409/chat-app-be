import { verifyToken } from "../utils/jwt.js";
import { unauthorized } from "@hapi/boom";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw unauthorized("Authorization token is missing or invalid");
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
