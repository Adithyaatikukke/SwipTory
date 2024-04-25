import express from "express";
import {
  addToBookmark,
  editUserStory,
  getLoggedinUser,
  getUserAllStories,
  loginUser,
  registerUser,
} from "../controller/user.js";
import { varifyToken } from "../authentication/vairifyUserToken.js";
const router = express.Router();

router
  .get("/", varifyToken, getLoggedinUser)
  .post("/bookmark", varifyToken, addToBookmark)
  .post("/edit/story", varifyToken, editUserStory)
  .get("/allStories", varifyToken, getUserAllStories)
  .post("/register", registerUser)
  .post("/login", loginUser);

export default router;
