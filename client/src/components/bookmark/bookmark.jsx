import React from "react";
import style from "./bookmark.module.css";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../redux/user/userSlice";
import { setSelectStory } from "../../redux/story/storySlice";
import { desktopMenu, mobileMenu } from "../../redux/app/appSlice";
import Desktop from "../navigation/desktop/desktop";
import Mobile from "../navigation/mobile/mobile";
const Bookmark = () => {
  const { bookmarks } = useSelector(user);
  const dispatch = useDispatch();
  const desktopToggle = useSelector(desktopMenu);
  const mobileToggle = useSelector(mobileMenu);

  const handleSetStoryPage = (value) => {
    dispatch(setSelectStory(value));
  };
  return (
    <>
      {desktopToggle && <Desktop />}
      {mobileToggle && <Mobile />}
      <section className={style.bookmark_container}>
        <div className={style.bookmark_section}>
          <span>Bookmark</span>
          <div className={style.bookmark_box_conatiner}>
            {bookmarks?.map((val) => (
              <div className={style.bookmark_box}>
                <img
                  onClick={() => handleSetStoryPage(val)}
                  className={style.image}
                  src={val.stories[0]?.image}
                  alt=""
                />

                <div className={style.bookmark_info}>
                  <span className={style.bookmark_header}>
                    {val.stories[0]?.heading}
                  </span>
                  <span className={style.bookmark_description}>
                    {val.stories[0]?.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Bookmark;
