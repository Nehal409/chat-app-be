import { notFound } from "@hapi/boom";
import { MESSAGES } from "../../../constants/messages.js";
import cloudinary from "../../../utils/cloudinary.js";
import { getSocketInstance, users } from "../../../utils/socket.js";
import { findUserById } from "../../auth/repositories/auth.repository.js";
import {
  fetchUserMessages,
  saveMessage,
} from "../repositories/chat.repository.js";

export const getMyMessages = async (currentUserId, userToChatId) => {
  const validateUserToChatUser = await findUserById(userToChatId);
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
  if (!validateReceiver) {
    throw notFound(MESSAGES.AUTH.USER_NOT_FOUND);
  }

  let imageUrl;
  if (image) {
    const uploadedImage = await cloudinary.uploader.upload(image);
    imageUrl = uploadedImage.secure_url;
  }

  const message = await saveMessage({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  // Emit message event through socket
  const io = getSocketInstance();
  const recipientSocketId = users.get(receiverId); // Get recipient's socket ID

  if (recipientSocketId) {
    io.to(recipientSocketId).emit("receiveMessage", message);
  }

  return message;
};
