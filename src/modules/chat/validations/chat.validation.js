import Joi from "joi";

export const sendMessageSchema = Joi.object({
  text: Joi.string().optional(),
  image: Joi.string().optional(),
});
