import express from "express";
import {
  getLoggedinUser,
  getUserAllStories,
  loginUser,
  registerUser,
} from "../controller/user.js";
import { varifyToken } from "../authentication/vairifyUserToken.js";
const router = express.Router();

router
  .get("/", varifyToken, getLoggedinUser)
  .patch("/edit/story", varifyToken)
  .get("/allStories", varifyToken, getUserAllStories)
  .post("/register", registerUser)
  .post("/login", loginUser);

export default router;
