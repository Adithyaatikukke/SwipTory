import React from "react";
import style from "./mobile.module.css";
import { IoMdClose } from "react-icons/io";
import userImage from "./../../../images/user.png";
import { useDispatch } from "react-redux";
import { setToggleMobileMenu } from "../../../redux/app/appSlice";
const Mobile = () => {
  const dispatch = useDispatch();

  const handleToggleMobileMenu = () => {
    dispatch(setToggleMobileMenu());
  };
  return (
    <section className={style.mobile_container}>
      <div className={style.mobile_section}>
        <div className={style.mobile_user_sec}>
          <span className={style.user_img}>
            <img src={userImage} alt="" />
          </span>{" "}
          <span className={style.username}> Rishikesh</span>
          <span
            onClick={() => handleToggleMobileMenu()}
            className={style.close}
          >
            <IoMdClose size={25} />
          </span>
        </div>
        <button>Your Story</button>
        <button>Add story</button>
        <button>Bookmarks</button>
        <button>Logout</button>
      </div>
    </section>
  );
};

export default Mobile;
