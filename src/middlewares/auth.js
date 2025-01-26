import { notFound, unauthorized } from "@hapi/boom";
import { MESSAGES } from "../constants/messages.js";
import { findUserById } from "../modules/auth/repositories/auth.repository.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw unauthorized(MESSAGES.AUTH.TOKEN_MISSING_OR_INVALID);
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);

    // Check if the user exists in the database
    const user = await findUserById(decoded.id);
    if (!user) {
      throw notFound(MESSAGES.AUTH.USER_NOT_FOUND);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
