export const MESSAGES = {
  AUTH: {
    EMAIL_ALREADY_EXISTS: "This email already exists.",
    INVALID_CREDENTIALS: "Invalid email or password.",
    USER_NOT_FOUND: "User not found.",
    REGISTER_SUCCESS: "User registered successfully.",
    LOGIN_SUCCESS: "Login successful.",
    PROFILE_SUCCESS: "User profile retrieved successfully.",
    PROFILE_UPDATE_SUCCESS: "User profile updated successfully.",
    TOKEN_EXPIRED_OR_INVALID: "Invalid or expired token.",
    TOKEN_MISSING_OR_INVALID: "Authorization token is missing or invalid.",
    PROFILE_PIC_REQUIRED: "Profile picture is required.",
  },
  DATABASE: {
    CONNECTION_SUCCESS: "Connected to the database successfully",
    CONNECTION_FAILED: "Failed to connect to the database",
  },
  INTERNAL_SERVER_ERROR: "Internal server error.",
  MULTER: {
    INVALID_FILE_TYPE:
      "Invalid file type. Only JPEG, PNG, and JPG are allowed.",
  },
};
