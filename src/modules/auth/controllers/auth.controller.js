import { MESSAGES } from "../../../constants/messages.js";
import validate from "../../../utils/validation.js";
import {
  fetchAllUsers,
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../services/auth.service.js";
import {
  loginSchema,
  registerSchema,
  updateProfileSchema,
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
  const validatedPayload = validate(req.body, updateProfileSchema);
  const user = await updateUserProfile(id, validatedPayload);
  res.status(200).json({
    message: MESSAGES.AUTH.PROFILE_UPDATE_SUCCESS,
    data: { user },
  });
};

export const getAllUsers = async (req, res) => {
  const { id } = req.user;
  const users = await fetchAllUsers(id);
  res.status(200).json({
    message: MESSAGES.AUTH.USER_FETCHED_SUCCESS,
    data: { users },
  });
};
