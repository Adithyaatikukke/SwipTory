import React from "react";
import style from "./header.module.css";
import userIamge from "../../images/user.png";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  desktopMenu,
  setAddStoryMode,
  setLoginMode,
  setRegisterMode,
  setToggleDesktopMenu,
  setToggleMobileMenu,
} from "../../redux/app/appSlice";
import { useSelector } from "react-redux";
import { user } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userInfo = useSelector(user);
  const deskstopToggle = useSelector(desktopMenu);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleToggleDesktopMenu = () => {
    dispatch(setToggleDesktopMenu());
  };

  const handleToggleMobileMenu = () => {
    dispatch(setToggleMobileMenu());
  };

  const handleSetRegisterPage = () => {
    dispatch(setRegisterMode());
  };

  const handleSetLoginPage = () => {
    dispatch(setLoginMode());
  };

  const handleSetAddStorypage = () => {
    dispatch(setAddStoryMode());
  };
  const navigateUserToNextPage = (route) => {
    navigate(route);
  };
  return (
    <section className={style.header_container}>
      <div className={style.header_section}>
        <span
          onClick={() => navigateUserToNextPage("/")}
          className={style.brand_text}
        >
          Swip Tory
        </span>
        {!userInfo?.name ? (
          <div className={style.header_register_box}>
            <button
              onClick={() => handleSetRegisterPage()}
              className={style.register_btn}
            >
              Register Now
            </button>
            <button
              onClick={() => handleSetLoginPage()}
              className={style.signin_btn}
            >
              Sign in
            </button>
          </div>
        ) : (
          <div className={style.header_user_info_section}>
            <button onClick={() => navigateUserToNextPage("/bookmark")}>
              <FaRegBookmark size={17} color="white" />
              Bookmarks
            </button>
            <button onClick={() => handleSetAddStorypage()}>
              <MdOutlineAddPhotoAlternate size={19} color="white" />
              Add Story
            </button>
            <span>
              <img src={userIamge} alt="" />
            </span>
            <span
              className={style.desktop_menu}
              onClick={() => handleToggleDesktopMenu()}
            >
              {deskstopToggle ? <IoMdClose size={27} /> : <MdMenu size={27} />}
            </span>
          </div>
        )}
        <span className={style.mobile_menu}>
          <MdMenu onClick={() => handleToggleMobileMenu()} size={27} />
        </span>
      </div>
    </section>
  );
};

export default Header;
