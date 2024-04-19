import React from "react";
import Home from "../../components/home/home";
import Header from "../../components/header/header";
import { useSelector } from "react-redux";
import {
  addStoryMode,
  loginMode,
  registerMode,
} from "../../redux/app/appSlice";
import Register from "../../components/register/register";
import style from "./homePage.module.css";
import Login from "../../components/login/login";
import AddStory from "../../components/addStory/addStory";
const HomePage = () => {
  const registerStatus = useSelector(registerMode);
  const loginStatus = useSelector(loginMode);
  const addStoryStatus = useSelector(addStoryMode);
  return (
    <>
      {addStoryStatus && <AddStory />}
      {loginStatus && <Login />}
      {registerStatus && <Register />}
      <div
        className={
          (registerStatus && style.blur) ||
          (loginStatus && style.blur) ||
          (addStoryStatus && style.blur)
        }
      >
        <Header />
        <Home />
      </div>
    </>
  );
};

export default HomePage;
