import React from "react";
import Bookmark from "../../components/bookmark/bookmark";
import Header from "../../components/header/header";
import { selectStory } from "../../redux/story/storySlice";
import Story from "../../components/story/story";
import style from "./bookmarkPage.module.css";
import { useSelector } from "react-redux";
import {
  addStoryMode,
  loginMode,
  registerMode,
} from "../../redux/app/appSlice";
import AddStory from "../../components/addStory/addStory";
import Login from "../../components/login/login";
import Register from "../../components/register/register";
const BookmarkPage = () => {
  const { stories } = useSelector(selectStory);
  const registerStatus = useSelector(registerMode);
  const loginStatus = useSelector(loginMode);
  const addStoryStatus = useSelector(addStoryMode);
  return (
    <>
      {stories?.length > 0 && <Story />}
      {addStoryStatus && <AddStory />}
      {loginStatus && <Login />}
      {registerStatus && <Register />}
      <div
        className={`${
          stories?.length > 0
            ? style.bookmarkpage_container_blur
            : style.bookmarkpage_container
        }`}
      >
        <Header />
        <Bookmark />
      </div>
    </>
  );
};

export default BookmarkPage;
