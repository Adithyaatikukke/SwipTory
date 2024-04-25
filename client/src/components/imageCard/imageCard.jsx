import React from "react";
import style from "./imageCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { listedStories, setCategory } from "../../redux/story/storySlice";
const ImageCard = ({ card, selectCategory, setSelectCategory }) => {
  const allStories = useSelector(listedStories);
  const dispatch = useDispatch();
  const handleSetcategory = (clickCategory) => {
    setSelectCategory(clickCategory);
    const category = allStories.find(
      ({ category }) => category === clickCategory
    );
    dispatch(setCategory({ stories: category, category: clickCategory }));
  };
  return (
    <section
      onClick={() => handleSetcategory(card.name)}
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
