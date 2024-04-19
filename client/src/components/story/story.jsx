import React from "react";
import style from "./story.module.css";
import Stories from "react-insta-stories";
import { IoMdClose } from "react-icons/io";
import { TbLocationFilled } from "react-icons/tb";
import { FaBookmark, FaHeart } from "react-icons/fa";
const burakHeading = {
  heading: (
    <div className={style.story_description}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, soluta.
    </div>
  ),
};
const initialStories = [
  {
    url: "https://i.imgur.com/QpUEcfi.jpg",
    type: "image",
    header: burakHeading,
    seeMore: true,
    duration: 1500,
  },
  {
    url: "https://i.imgur.com/in5Jr1h.jpg",
    type: "image",
    header: burakHeading,
    seeMore: ({ close }) => {
      return <div onClick={close}>Hello, click to close this.</div>;
    },
  },
  {
    url: "https://i.imgur.com/LBRXhIq.jpg",
    type: "image",
    header: burakHeading,
  },

  {
    url: "https://i.imgur.com/ARMxyC4.png",
    type: "image",
    header: burakHeading,
  },
];
const StoryComponent = () => {
  const [stories, setStories] = React.useState(initialStories);

  const onAllStoriesEndHandler = () => {
    console.log("stories ended");
  };

  const storyContent = {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
  };

  return (
    <section className={style.story_conatiner}>
      <div className={style.story_section}>
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
          <span className={style.story_modal_close_icon}>
            <IoMdClose />
          </span>
        </div>
        <Stories
          stories={stories}
          defaultInterval={5000}
          width={"20rem"}
          height={"90vh"}
          storyStyles={storyContent}
          loop={false}
          keyboardNavigation={true}
          isPaused={() => {}}
          currentIndex={() => {}}
          onStoryStart={() => {}}
          onStoryEnd={() => {}}
          onAllStoriesEnd={onAllStoriesEndHandler}
        />
      </div>
    </section>
  );
};

export default StoryComponent;
