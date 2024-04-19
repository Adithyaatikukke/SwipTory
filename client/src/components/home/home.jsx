import React, { useState } from "react";
import style from "./home.module.css";
import Desktop from "../navigation/desktop/desktop";
import Mobile from "../navigation/mobile/mobile";
import { useSelector } from "react-redux";
import {
  desktopMenu,
  mobileMenu,
  registerMode,
} from "../../redux/app/appSlice";

import ImageCard from "../imageCard/imageCard";
import { allCategories } from "../../data/storyCategories";

const Home = () => {
  const [selectCategory, setSelectCategory] = useState("All");
  const desktopToggle = useSelector(desktopMenu);
  const mobileToggle = useSelector(mobileMenu);

  return (
    <>
      {desktopToggle && <Desktop />}
      {mobileToggle && <Mobile />}
      <section className={style.home_container}>
        <div className={style.home_category_box}>
          {allCategories.map((data) => (
            <ImageCard
              selectCategory={selectCategory}
              setSelectCategory={setSelectCategory}
              card={data}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
