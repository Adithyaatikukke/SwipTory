import express from "express";
import {
  createStory,
  getAllListedStories,
  likeStory,
  shareStory,
} from "../controller/story.js";
import { varifyToken } from "../authentication/vairifyUserToken.js";

const router = express.Router();

router
  .get("/stories", getAllListedStories)
  .post("/likeordislike", varifyToken, likeStory)
  .get("/shareStory/:id", shareStory)
  .post("/create", varifyToken, createStory);

export default router;
