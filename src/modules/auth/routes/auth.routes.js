import { Router } from "express";
import { authenticate } from "../../../middlewares/auth.js";
import {
    login,
    register,
    userProfile,
} from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *             required:
 *               - fullname
 *               - email
 *               - password
 *               - confirmPassword
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: This email already exists
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       404:
 *         description: User not found
 */
router.get("/profile", authenticate, userProfile);

export default router;