import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const registerUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ fullname: name, email, password: hashedPassword });
};

export const loginUser = async ({ email, password }) => {
  return { email, password };
};
