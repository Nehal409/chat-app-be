import { Router } from "express";
import {
  register,
  login,
  userProfile,
} from "../controllers/auth.controller.js";
import { authenticate } from "../../../middlewares/auth.js";

const router = Router();

// Register and login routes
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate, userProfile);

export default router;