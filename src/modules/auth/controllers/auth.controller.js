import validate from "../../../utils/validation.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import { registerSchema } from "../validations/auth.validation.js";

export const register = async (req, res) => {
  const validatedPayload = validate(req.body, registerSchema);
  const user = await registerUser(validatedPayload);
  res.status(201).json({ message: "User registered successfully", user });
};

export const login = async (req, res) => {
  const token = await loginUser(req.body);
  res.status(200).json({ message: "Login successful", token });
};
