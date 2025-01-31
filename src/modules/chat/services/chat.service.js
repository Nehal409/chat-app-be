import { notFound } from "@hapi/boom";
import { MESSAGES } from "../../../constants/messages.js";
import { findUserById } from "../../auth/repositories/auth.repository.js";
import {
  fetchUserMessages,
  saveMessage,
} from "../repositories/chat.repository.js";
import cloudinary from "../../../utils/cloudinary.js";

export const getMyMessages = async (currentUserId, userToChatId) => {
  const validateUserToChatUser = await findUserById(userToChatId);
  // Validate if the user to chat exists. Current user is already validated through the middleware
  if (!validateUserToChatUser) {
    throw notFound(MESSAGES.AUTH.USER_NOT_FOUND);
  }

  return fetchUserMessages(currentUserId, userToChatId);
};

export const sendNewMessages = async (
  senderId,
  receiverId,
  { text, image }
) => {
  const validateReceiver = await findUserById(receiverId);
  // Validate if the receiver exists.
  if (!validateReceiver) {
    throw notFound(MESSAGES.AUTH.USER_NOT_FOUND);
  }

  let imageUrl;
  if (image) {
    const uploadedImage = await cloudinary.uploader.upload(image);
    imageUrl = uploadedImage.secure_url;
  }

  return saveMessage({ senderId, receiverId, text, image: imageUrl });
};
