import express from "express";
import { loginUser, registerUser } from "../controller/user.js";
const router = express.Router();

router.post("/register", registerUser).post("/login", loginUser);

export default router;