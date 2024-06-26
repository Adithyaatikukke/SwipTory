import React, { useEffect, useState } from "react";
import style from "./register.module.css";
import { useSelector } from "react-redux";
import {
  registerMode,
  setRefreshToggle,
  setRegisterMode,
  setToggleDesktopMenu,
} from "../../redux/app/appSlice";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import {
  registerError,
  registerUserAysnc,
  userFatching,
  userToggle,
} from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const registerStatus = useSelector(registerMode);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registarErrorBackend, setRegisterErrorBackend] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggle = useSelector(userToggle);
  const error = useSelector(registerError);

  const handleSetRegisterToggle = () => {
    dispatch(setRegisterMode());
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
        dispatch(registerUserAysnc({ password, name }));
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const handleResetRegisterPage = () => {
    dispatch(setRegisterMode());
    dispatch(setRefreshToggle());
    navigate("/");
  };
  useEffect(() => {
    if (isLoading && !error) {
      setIsLoading(false);
      setName("");
      setPassword("");
      handleResetRegisterPage();
    }
    if (error) {
      setIsLoading(false);
      setRegisterErrorBackend(true);
    }
  }, [toggle]);
  return (
    <section className={style.register_container}>
      <div className={style.register_section}>
        <span className={style.text}>Register to SwipTory</span>
        <span onClick={() => handleSetRegisterToggle()} className={style.close}>
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
            {registarErrorBackend && <span>User already exists!</span>}
          </div>
        </div>
        <button
          onClick={() => handleSubmitForm()}
          className={style.register_btn}
        >
          {isLoading ? <BeatLoader color="white" /> : "Register"}
        </button>
      </div>
    </section>
  );
};

export default Register;
