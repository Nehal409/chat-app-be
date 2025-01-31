import { Router } from "express";
import { authenticate } from "../../../middlewares/auth.js";
import { getMessages, sendMessages } from "../controllers/chat.controller.js";

const router = Router();

router.get("/users/:id", authenticate, getMessages);
router.post("/users/:id", authenticate, sendMessages);


export default router;
