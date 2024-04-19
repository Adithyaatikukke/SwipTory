import React from "react";
import style from "./desktop.module.css";
const Desktop = () => {
  return (
    <section className={style.desktop_container}>
      <span className={style.username}>Rishikesh</span>
      <button className={style.logout}>Logout</button>
    </section>
  );
};

export default Desktop;
