import React, { useEffect, useState } from "react";
import style from "./story.module.css";
import Stories from "react-insta-stories";
import { IoMdClose } from "react-icons/io";
import { TbLocationFilled } from "react-icons/tb";
import { FaBookmark, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectStory,
  setSelectStory,
  toggle,
} from "../../redux/story/storySlice";

const Story = () => {
  const [stories, setStories] = useState([]);
  const toggleStory = useSelector(toggle);
  const clickStory = useSelector(selectStory);
  const dispatch = useDispatch();

  const handleResetSelectStory = () => {
    dispatch(setSelectStory({}));
  };

  const setHeader = (header, description) => {
    const burakHeading = {
      heading: (
        <div className={style.story_info}>
          <span className={style.story_header}>{header}</span>
          <span className={style.story_description}>{description}</span>
        </div>
      ),
    };
    return burakHeading;
  };

  let initialStories = [];
  const configureAllimages = () => {
    if (clickStory?.length) {
      clickStory?.forEach(({ image, heading, description }) => {
        let val = {
          url: image,
          type: "image",
          header: setHeader(heading, description),

          duration: 1500,
        };

        initialStories.push(val);
      });
      setStories(initialStories);
    }
  };
  useEffect(() => {
    configureAllimages();
  }, [toggleStory]);

  const onAllStoriesEndHandler = () => {
    console.log("stories ended");
  };

  const storyContent = {
    width: "25rem",
    height: "20rem",
    maxWidth: "100%",
    maxHeight: "100%",

    margin: "auto",
  };

  return (
    <section className={style.story_conatiner}>
      <div className={style.story_section}>
        <div className={style.story_int}>
          <div className={style.icon_container}>
            <span className={style.story_modal_mark_icon}>
              <FaBookmark />
            </span>
            <span className={style.story_modal_like_icon}>
              <FaHeart />
            </span>
            <span className={style.story_modal_share_icon}>
              <TbLocationFilled />
            </span>
            <span
              onClick={() => handleResetSelectStory()}
              className={style.story_modal_close_icon}
            >
              <IoMdClose />
            </span>
          </div>
        </div>
        {stories.length > 0 && (
          <Stories
            stories={stories}
            defaultInterval={5000}
            width={"20rem"}
            height={"85vh"}
            storyStyles={storyContent}
            loop={false}
            keyboardNavigation={true}
            isPaused={() => {}}
            currentIndex={() => {}}
            onStoryStart={() => {}}
            onStoryEnd={() => {}}
            onAllStoriesEnd={onAllStoriesEndHandler}
          />
        )}
      </div>
    </section>
  );
};

export default Story;
