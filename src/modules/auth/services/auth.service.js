import { badRequest, notFound, unauthorized } from "@hapi/boom";
import bcrypt from "bcryptjs";
import { MESSAGES } from "../../../constants/messages.js";
import cloudinary from "../../../utils/cloudinary.js";
import { generateToken } from "../../../utils/jwt.js";
import {
  createUser,
  findByUserIdAndUpdate,
  findUserByEmail,
  findUserById,
} from "../repositories/auth.repository.js";

export const registerUser = async ({ fullname, email, password }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw badRequest(MESSAGES.AUTH.EMAIL_ALREADY_EXISTS);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser({
    fullname,
    email,
    password: hashedPassword,
  });

  return generateToken({ id: newUser.id, email });
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

  return generateToken({ id: user.id, email });
};

export const getUserProfile = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw notFound(MESSAGES.AUTH.USER_NOT_FOUND);
  }

  return userProfileWithoutPassword(user);
};

export const updateUserProfile = async (userId, multerObject) => {
  if (!multerObject) {
    throw badRequest(MESSAGES.AUTH.PROFILE_PIC_REQUIRED);
  }
  const uploadedProfilePicture = await cloudinary.uploader.upload(
    multerObject.path
  );
  const updateUserProfile = await findByUserIdAndUpdate(userId, {
    profilePicture: uploadedProfilePicture.secure_url,
  });

  return userProfileWithoutPassword(updateUserProfile);
};

const userProfileWithoutPassword = async (userProfile) => {
  // Create a copy without the password field
  const userWithoutPassword = { ...userProfile.toObject() };
  delete userWithoutPassword.password;

  return userWithoutPassword;
};
