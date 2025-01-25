import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = Router();

// Register and login routes
router.post("/register", register);
router.post("/login", login);

export default router;