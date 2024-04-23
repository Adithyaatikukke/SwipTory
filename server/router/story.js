import express from "express";
import { createStory, getAllListedStories } from "../controller/story.js";
import { varifyToken } from "../authentication/vairifyUserToken.js";

const router = express.Router();

router
  .get("/stories", getAllListedStories)
  .post("/create", varifyToken, createStory);

export default router;
