import express from "express";
import { createStory } from "../controller/story.js";

const router = express.Router();

router.post("/post", createStory);

export default router;
