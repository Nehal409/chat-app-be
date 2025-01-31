import { MESSAGES } from "../../../constants/messages.js";
import validate from "../../../utils/validation.js";
import { getMyMessages, sendNewMessages } from "../services/chat.service.js";
import { sendMessageSchema } from "../validations/chat.validation.js";

export const getMessages = async (req, res) => {
  const { id: currentUserId } = req.user;
  const { id: userToChatId } = req.params;
  const messages = await getMyMessages(currentUserId, userToChatId);
  res
    .status(200)
    .json({ message: MESSAGES.MESSAGE.FETCH_SUCCESS, data: { messages } });
};

export const sendMessages = async (req, res) => {
  const { id: senderId } = req.user;
  const { id: receiverId } = req.params;
  const validatedPayload = validate(req.body, sendMessageSchema);

  const messages = await sendNewMessages(
    senderId,
    receiverId,
    validatedPayload
  );
  res
    .status(201)
    .json({ message: MESSAGES.MESSAGE.SENT_SUCCESS, data: { messages } });
};
