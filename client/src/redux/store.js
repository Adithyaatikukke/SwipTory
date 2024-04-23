import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/appSlice";
import userReducer from "./user/userSlice";
import storyReducer from "./story/storySlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    story: storyReducer,
  },
});
