import { MESSAGES } from "../../../constants/messages.js";
import validate from "../../../utils/validation.js";
import {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../services/auth.service.js";
import {
  loginSchema,
  registerSchema,
} from "../validations/auth.validation.js";

export const register = async (req, res) => {
  const validatedPayload = validate(req.body, registerSchema);
  const token = await registerUser(validatedPayload);
  res
    .status(201)
    .json({ message: MESSAGES.AUTH.REGISTER_SUCCESS, data: { token } });
};

export const login = async (req, res) => {
  const validatedPayload = validate(req.body, loginSchema);
  const token = await loginUser(validatedPayload);
  res
    .status(200)
    .json({ message: MESSAGES.AUTH.LOGIN_SUCCESS, data: { token } });
};

export const userProfile = async (req, res) => {
  const { id } = req.user;
  const user = await getUserProfile(id);
  res
    .status(200)
    .json({ message: MESSAGES.AUTH.PROFILE_SUCCESS, data: { user } });
};

export const updateProfile = async (req, res) => {
  const { id } = req.user;
  const user = await updateUserProfile(id, req.file);
  res.status(200).json({
    message: MESSAGES.AUTH.PROFILE_UPDATE_SUCCESS,
    data: { user },
  });
};
