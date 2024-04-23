import React from "react";
import style from "./desktop.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, user } from "../../../redux/user/userSlice";
import { setToggleDesktopMenu } from "../../../redux/app/appSlice";
const Desktop = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(user);
  const handleLOgoutUser = () => {
    dispatch(logoutUser());
    dispatch(setToggleDesktopMenu());
  };
  return (
    <section className={style.desktop_container}>
      <span className={style.username}>{name}</span>
      <button onClick={() => handleLOgoutUser()} className={style.logout}>
        Logout
      </button>
    </section>
  );
};

export default Desktop;
