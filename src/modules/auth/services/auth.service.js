import { badRequest, notFound, unauthorized } from "@hapi/boom";
import bcrypt from "bcryptjs";
import { MESSAGES } from "../../../constants/messages.js";
import { generateToken } from "../../../utils/jwt.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../repositories/auth.repository.js";

export const registerUser = async ({ fullname, email, password }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw badRequest(MESSAGES.AUTH.EMAIL_ALREADY_EXISTS);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return createUser({ fullname, email, password: hashedPassword });
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw unauthorized(MESSAGES.AUTH.INVALID_CREDENTIALS);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw unauthorized(MESSAGES.AUTH.INVALID_CREDENTIALS);
  }

  const token = generateToken({ id: user.id, email: user.email });
  return token;
};

export const getUserProfile = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw notFound(MESSAGES.AUTH.USER_NOT_FOUND);
  }

  // Create a copy without the password field
  const userWithoutPassword = { ...user.toObject() };
  delete userWithoutPassword.password;

  return userWithoutPassword;
};
