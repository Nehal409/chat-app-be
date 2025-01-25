import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({ message: "User registered successfully", user });
};

export const login = async (req, res) => {
  const token = await loginUser(req.body);
  res.status(200).json({ message: "Login successful", token });
};
