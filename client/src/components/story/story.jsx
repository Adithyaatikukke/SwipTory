import React, { useEffect, useRef, useState } from "react";
import style from "./story.module.css";
import Stories from "react-insta-stories";
import { IoMdClose } from "react-icons/io";
import { TbLocationFilled } from "react-icons/tb";
import { FaBookmark, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  likeStoryAysnc,
  selectStory,
  setSelectStory,
  shareStoryToggle,
  toggle,
} from "../../redux/story/storySlice";
import { addToBookmarkAysnc, user } from "../../redux/user/userSlice";
import { setLoginMode } from "../../redux/app/appSlice";

const Story = () => {
  const [stories, setStories] = useState([]);
  const toggleStory = useSelector(toggle);
  const toggle2 = useSelector(shareStoryToggle);
  const userInfo = useSelector(user);
  const clickStory = useSelector(selectStory);
  const dispatch = useDispatch();
  const handleCopyToClipboard = () => {
    toast.success("copied to clipboard!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleAddToBookmark = () => {
    if (userInfo?._id) {
      dispatch(addToBookmarkAysnc({ id: clickStory?._id }));
    } else {
      toast.info("Please login", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(setSelectStory({}));
      dispatch(setLoginMode());
    }
  };

  const handleResetSelectStory = () => {
    dispatch(setSelectStory({}));
  };

  const handleLikeOrRemoveLikeStory = () => {
    if (userInfo?._id) {
      dispatch(likeStoryAysnc({ id: clickStory?._id }));
    } else {
      toast.info("Please login", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(setSelectStory({}));
      dispatch(setLoginMode());
    }
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
    if (clickStory?.stories?.length) {
      clickStory?.stories?.forEach(({ image, heading, description }) => {
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
            <span
              onClick={() => handleAddToBookmark()}
              className={style.story_modal_mark_icon}
            >
              {userInfo?.bookmarks?.find(
                ({ _id }) => _id === clickStory?._id
              ) ? (
                <FaBookmark color="blue" />
              ) : (
                <FaBookmark />
              )}
            </span>
            <span
              onClick={() => handleLikeOrRemoveLikeStory()}
              className={style.story_modal_like_icon}
            >
              {clickStory?.likes?.find((id) => id === userInfo?._id) ? (
                <FaHeart color="red" />
              ) : (
                <FaHeart />
              )}{" "}
              <span className={style.like_count}>
                {clickStory?.likes?.length > 0 ? clickStory?.likes?.length : ""}
              </span>
            </span>
            <span
              onClick={() => handleCopyToClipboard()}
              className={style.story_modal_share_icon}
            >
              <CopyToClipboard
                text={`${window.location.origin}/share/${clickStory?._id}`}
              >
                <TbLocationFilled />
              </CopyToClipboard>
            </span>
            <span
              onClick={() => handleResetSelectStory()}
              className={style.story_modal_close_icon}
            >
              <IoMdClose />
            </span>
          </div>
        </div>
        {clickStory.stories.length > 0 && stories?.length > 0 && (
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
