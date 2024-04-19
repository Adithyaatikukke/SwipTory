import express from "express";
import dotenv from "dotenv";
import userRouter from "./router/user.js";
import cors from "cors";
import { connectMongoDb } from "./config/MongoDb.js";
import storyRouter from "./router/story.js";
dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());
connectMongoDb();

server.use("/node/api/v1/user", userRouter);
server.use("/node/api/v1/story", storyRouter);
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT ${PORT}`);
});
