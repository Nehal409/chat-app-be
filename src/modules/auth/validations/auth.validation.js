import Joi from "joi";

export const registerSchema = Joi.object({
  fullname: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const updateProfileSchema = Joi.object({
  profilePicture: Joi.string()
    .pattern(/^data:image\/(png|jpeg|jpg|gif);base64,([A-Za-z0-9+/=]+)$/)
    .required()
    .messages({
      "string.empty": "Profile picture is required.",
      "string.pattern.base":
        "Invalid profile picture format. Must be a Base64-encoded image.",
    }),
});
