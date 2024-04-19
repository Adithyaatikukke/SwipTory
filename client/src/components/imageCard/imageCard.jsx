import React from "react";
import style from "./imageCard.module.css";
const ImageCard = ({ card, selectCategory, setSelectCategory }) => {
  const handleSetcategory = (category) => {
    setSelectCategory(category);
  };
  return (
    <section
      onClick={() => setSelectCategory(card.name)}
      className={`${
        selectCategory === card.name
          ? style.imgcard_container_border
          : style.imgcard_container
      }`}
    >
      <span className={style.imgcard_img}>
        <img src={card.image} alt="" />
      </span>
      <span style={{ left: card.left }} className={style.imgcard_title}>
        {card.name}
      </span>
    </section>
  );
};

export default ImageCard;
