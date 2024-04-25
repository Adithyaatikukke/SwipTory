import React from "react";
import style from "./mobile.module.css";
import { IoMdClose } from "react-icons/io";
import userImage from "./../../../images/user.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddStoryMode,
  setLoginMode,
  setRegisterMode,
  setToggleMobileMenu,
} from "../../../redux/app/appSlice";
import { logoutUser, user } from "../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
const Mobile = () => {
  const { _id } = useSelector(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleToggleMobileMenu = () => {
    dispatch(setToggleMobileMenu());
  };
  const handleSetAddStorPage = () => {
    dispatch(setToggleMobileMenu());
    dispatch(setAddStoryMode());
  };
  const handleLogOutUser = () => {
    dispatch(logoutUser());
    dispatch(setToggleMobileMenu());
    navigate("/");
  };
  const handleSetRegisterPage = () => {
    dispatch(setToggleMobileMenu());
    dispatch(setRegisterMode());
  };
  const handleSetSignPage = () => {
    dispatch(setToggleMobileMenu());
    dispatch(setLoginMode());
  };
  const handleNavigateUserNextPage = (route) => {
    dispatch(setToggleMobileMenu());
    navigate(route);
  };
  return (
    <section className={style.mobile_container}>
      <div className={style.mobile_section}>
        <div className={style.mobile_user_sec}>
          <span className={style.user_img}>
            <img src={userImage} alt="" />
          </span>
          <span className={style.username}> Rishikesh</span>
          <span
            onClick={() => handleToggleMobileMenu()}
            className={style.close}
          >
            <IoMdClose size={25} />
          </span>
        </div>
        {_id ? (
          <>
            <button onClick={() => handleNavigateUserNextPage("/")}>
              Your Story
            </button>
            <button onClick={() => handleSetAddStorPage()}>Add story</button>
            <button onClick={() => handleNavigateUserNextPage("/bookmark")}>
              Bookmarks
            </button>
            <button onClick={() => handleLogOutUser()}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => handleSetSignPage()}>Sign in</button>
            <button onClick={() => handleSetRegisterPage()}>Register</button>
          </>
        )}
      </div>
    </section>
  );
};

export default Mobile;
