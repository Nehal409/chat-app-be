import Joi from "joi";

export const sendMessageSchema = Joi.object({
  text: Joi.string().optional().allow("", null),
  image: Joi.string()
    .pattern(/^data:image\/(png|jpeg|jpg|gif);base64,([A-Za-z0-9+/=]+)$/)
    .messages({
      "string.empty": "Profile picture is required.",
      "string.pattern.base":
        "Invalid profile picture format. Must be a Base64-encoded image.",
    })
    .optional()
    .allow(null),
});
