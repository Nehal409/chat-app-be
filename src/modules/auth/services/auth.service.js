import { badRequest } from "@hapi/boom";
import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
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
  return { email, password };
};
