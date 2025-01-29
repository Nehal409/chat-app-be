import { badRequest } from "@hapi/boom";
import multer from "multer";
import path from "path";
import fs from "fs";
import { MESSAGES } from "../constants/messages.js";

export const multerConfig = (folder = "uploads/") => {
  // Ensure the folder exists
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const fileName = `${Date.now()}-${file.fieldname}${ext}`;
      cb(null, fileName);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(badRequest(MESSAGES.MULTER.INVALID_FILE_TYPE), false);
    }
  };

  return multer({
    storage,
    limits: {
      fileSize: 2 * 1024 * 1024, // Limit file size to 2MB
    },
    fileFilter,
  });
};
