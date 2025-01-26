import { MESSAGES } from "../../../constants/messages.js";
import validate from "../../../utils/validation.js";
import {
  getUserProfile,
  loginUser,
  registerUser,
} from "../services/auth.service.js";
import { registerSchema } from "../validations/auth.validation.js";

export const register = async (req, res) => {
  const validatedPayload = validate(req.body, registerSchema);
  const user = await registerUser(validatedPayload);
  res.status(201).json({ message: MESSAGES.AUTH.REGISTER_SUCCESS, user });
};

export const login = async (req, res) => {
  const token = await loginUser(req.body);
  res.status(200).json({ message: MESSAGES.AUTH.LOGIN_SUCCESS, token });
};

export const userProfile = async (req, res) => {
  const { id } = req.user;
  const user = await getUserProfile(id);
  res
    .status(200)
    .json({ message: MESSAGES.AUTH.PROFILE_SUCCESS, user });
};
