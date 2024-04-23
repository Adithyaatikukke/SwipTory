import React, { useEffect, useState } from "react";
import style from "./login.module.css";
import { useSelector } from "react-redux";
import {
  loginMode,
  setLoginMode,
  setToggleDesktopMenu,
} from "../../redux/app/appSlice";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import {
  loginUserAysnc,
  siginError,
  userToggle,
} from "../../redux/user/userSlice";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginStatus = useSelector(loginMode);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [siginErrorBackend, setSiginErrorBackend] = useState(false);

  const dispatch = useDispatch();
  const toggle = useSelector(userToggle);
  const error = useSelector(siginError);

  const handleSetloginToggle = () => {
    dispatch(setLoginMode());
  };

  const handleSubmitForm = () => {
    try {
      setNameError(false);
      setPasswordError(false);
      if (!password && !name) {
        setNameError(true);
        setPasswordError(true);
      } else if (!password) {
        setPasswordError(true);
      } else if (!name) {
        setNameError(true);
      } else {
        setIsLoading(true);
        dispatch(loginUserAysnc({ password, name }));
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleResetLoginPage = () => {
    dispatch(setLoginMode());
  };

  useEffect(() => {
    if (isLoading && !error) {
      setIsLoading(false);
      setName("");
      setPassword("");
      handleResetLoginPage();
    }
    if (error) {
      setSiginErrorBackend(true);
      setIsLoading(false);
    }
  }, [toggle]);
  return (
    <section className={style.login_container}>
      <div className={style.login_section}>
        <span className={style.text}>Login to SwipTory</span>
        <span onClick={() => handleSetloginToggle()} className={style.close}>
          <IoMdCloseCircleOutline size={30} />
        </span>
        <div className={style.inputs_section}>
          <div className={style.input_box1}>
            <span>UserName</span>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter username"
              type="text"
            />
          </div>
          <div className={style.input_box2}>
            <span>Password</span>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className={style.eye}
            >
              {showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
            </span>
          </div>
          <div className={style.error_section}>
            {nameError && <span>*Username is required!</span>}
            {passwordError && <span>*Password is required!</span>}
            {siginErrorBackend && <span>User not found!</span>}
          </div>
        </div>
        <button onClick={() => handleSubmitForm()} className={style.login_btn}>
          {isLoading ? <BeatLoader color="white" /> : "login"}
        </button>
      </div>
    </section>
  );
};

export default Login;
