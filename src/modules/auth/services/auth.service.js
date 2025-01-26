import { badRequest, notFound, unauthorized } from "@hapi/boom";
import bcrypt from "bcryptjs";
import { generateToken } from "../../../utils/jwt.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../repositories/auth.repository.js";

export const registerUser = async (userData) => {
  const { fullname, email, password } = userData;
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw badRequest("This email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return createUser({ fullname, email, password: hashedPassword });
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw unauthorized("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw unauthorized("Invalid email or password");
  }

  const token = generateToken({ id: user.id, email: user.email });
  return token;
};

export const getUserProfile = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw notFound("User not found");
  }

  // Create a copy without the password field
  const userWithoutPassword = { ...user.toObject() };
  delete userWithoutPassword.password;

  return userWithoutPassword;
};
