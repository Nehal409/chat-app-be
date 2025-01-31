import Message from "../models/Message.js";

// Fetch All the messages where the user is either sender or receiver
export const fetchUserMessages = async (currentUserId, userToChatId) => {
  return Message.find({
    $or: [
      {
        senderId: currentUserId,
        receiverId: userToChatId,
      },
      {
        senderId: userToChatId,
        receiverId: currentUserId,
      },
    ],
  });
};

export const saveMessage = async (messageData) => {
  return Message.create(messageData);
};
