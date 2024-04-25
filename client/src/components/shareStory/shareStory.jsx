import React, { useEffect, useState } from "react";
import ShareStoryComp from "../shareStoryComp/shareStoryComp";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSahreStoryAsync,
  likeStoryAysnc,
  selectStory,
  shareStory,
  shareStoryError,
  shareStoryToggle,
} from "../../redux/story/storySlice";
import style from "./shareStory.module.css";
import { SyncLoader } from "react-spinners";

const ShareStory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const error = useSelector(shareStoryError);
  const shareId = useSelector(selectStory);
  const toggleStory = useSelector(shareStoryToggle);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const handleLoadShareStory = () => {
    if (shareId?._id !== id) {
      setIsloading(true);
      dispatch(getSahreStoryAsync(id));
    }
  };
  useEffect(() => {
    if (isLoading) {
      setIsloading(false);
    }
    if ((shareId._id && shareId?._id !== id) || !shareId._id) {
      handleLoadShareStory();
    }
    if (error) {
      setNotFound(true);
    }
  }, [toggleStory]);

  return (
    <>
      {!notFound ? (
        <>
          {isLoading && !shareId?._id ? (
            <div className={style.share_container}>
              <span>
                <SyncLoader color="#36d7b7" />
              </span>
            </div>
          ) : (
            <ShareStoryComp />
          )}
        </>
      ) : (
        <div className={style.share_container}>
          <span>
            <span className={style.not_found}>Story not found!</span>
          </span>
        </div>
      )}
    </>
  );
};

export default ShareStory;
