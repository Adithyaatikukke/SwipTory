import React, { useState } from "react";
import style from "./allStories.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import {
  category,
  getAllListedStoriesAsync,
  listedStories,
  setSelectStory,
  stories,
} from "../../redux/story/storySlice";
import { BeatLoader } from "react-spinners";
import { user, userAllStories } from "../../redux/user/userSlice";
import { setAddStoryMode, setEditStory } from "../../redux/app/appSlice";
const AllStories = () => {
  const allStories = useSelector(listedStories);
  const userCreatedStories = useSelector(userAllStories);
  const { _id } = useSelector(user);
  const selectCategoryStories = useSelector(stories);
  const clickCategory = useSelector(category);
  const [seeMoreload, setSeeMoreLoad] = useState("");
  const dispatch = useDispatch();

  const handleLoadMoreStories = (category, loadVal) => {
    const data = {
      foodLimit: allStories.find(({ category }) => category === "Food")
        .currentLimit,
      fitnessLimit: allStories.find(({ category }) => category === "Fitness")
        .currentLimit,
      travelLimit: allStories.find(({ category }) => category === "Travel")
        .currentLimit,
      moviesLimit: allStories.find(({ category }) => category === "Movies")
        .currentLimit,
      educationLimit: allStories.find(
        ({ category }) => category === "Education"
      ).currentLimit,
    };

    if (category === "Food") {
      setSeeMoreLoad(category);
      data.foodLimit = data.foodLimit + loadVal;
      dispatch(getAllListedStoriesAsync(data));
    } else if (category === "Movies") {
      setSeeMoreLoad(category);
      data.moviesLimit = data.moviesLimit + loadVal;
      dispatch(getAllListedStoriesAsync(data));
    } else if (category === "Education") {
      setSeeMoreLoad(category);
      data.educationLimit = data.educationLimit + loadVal;
      dispatch(getAllListedStoriesAsync(data));
    } else if (category === "Travel") {
      setSeeMoreLoad(category);
      data.travelLimit = data.fitnessLimit + loadVal;
      dispatch(getAllListedStoriesAsync(data));
    } else {
      setSeeMoreLoad(category);
      data.fitnessLimit = data.fitnessLimit + loadVal;
      dispatch(getAllListedStoriesAsync(data));
    }
  };

  const handleSetSelectStory = (value) => {
    dispatch(setSelectStory(value));
  };
  const handleSetEditStory = (story) => {
    dispatch(setEditStory(story));
    dispatch(setAddStoryMode());
  };

  return (
    <section className={style.allStories_container}>
      <div className={style.allStories_section}>
        {selectCategoryStories?.category && clickCategory !== "All" ? (
          <div className={style.story_box}>
            <span className={style.tag}>Top Stories About {clickCategory}</span>
            {selectCategoryStories?.stories?.length > 0 ? (
              <div className={style.stories_section}>
                <>
                  {selectCategoryStories?.stories?.map((val, id) => (
                    <div className={style.story_container} key={id}>
                      <img
                        onClick={() => handleSetSelectStory(val)}
                        className={style.image}
                        src={val.stories[val.stories.length - 1].image}
                        alt=""
                      />

                      <div className={style.story_info}>
                        <span className={style.story_heading}>
                          {val.stories[val.stories.length - 1].heading.length >
                          34 ? (
                            <>
                              {val.stories[
                                val.stories.length - 1
                              ].heading.slice(0, 34)}
                              ...
                            </>
                          ) : (
                            val.stories[val.stories.length - 1].heading
                          )}
                        </span>
                        <span className={style.story_description}>
                          {val.stories[val.stories.length - 1].description
                            .length > 38 ? (
                            <>{val.stories[0].description.slice(0, 38)}...</>
                          ) : (
                            val.stories[val.stories.length - 1].description
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              </div>
            ) : (
              <span className={style.no_story}>No stories Available</span>
            )}
          </div>
        ) : (
          <>
            {_id && (
              <div className={style.story_box}>
                <span className={style.tag}>Your Created stories</span>
                {userCreatedStories?.length > 0 ? (
                  <>
                    {" "}
                    <div className={style.stories_section}>
                      {userCreatedStories.map((val, id) => (
                        <div className={style.story_container} key={id}>
                          <img
                            onClick={() => handleSetSelectStory(val)}
                            className={style.image}
                            src={val.stories[val.stories.length - 1].image}
                            alt=""
                          />

                          <div className={style.story_info}>
                            <span className={style.story_heading}>
                              {val.stories[val.stories.length - 1].heading
                                .length > 34 ? (
                                <>
                                  {val.stories[
                                    val.stories.length - 1
                                  ].heading.slice(0, 34)}
                                  ...
                                </>
                              ) : (
                                val.stories[val.stories.length - 1].heading
                              )}
                            </span>
                            <span className={style.story_description}>
                              {val.stories[val.stories.length - 1].description
                                .length > 38 ? (
                                <>
                                  {val.stories[0].description.slice(0, 38)}...
                                </>
                              ) : (
                                val.stories[val.stories.length - 1].description
                              )}
                            </span>
                          </div>
                          <button
                            onClick={() => handleSetEditStory(val)}
                            className={style.edit_story_btn}
                          >
                            Edit
                            <FaRegEdit />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <span className={style.no_story}>No stories created yet</span>
                )}
              </div>
            )}
            {allStories?.map(({ category, stories, limit }, i) => (
              <div key={i} className={style.story_box}>
                <span className={style.tag}>Top Stories About {category}</span>
                {stories.length ? (
                  <>
                    <div className={style.stories_section}>
                      {stories?.map((val, id) => (
                        <div
                          onClick={() => handleSetSelectStory(val)}
                          className={style.story_container}
                          key={id}
                        >
                          <img
                            className={style.image}
                            src={val.stories[val.stories.length - 1].image}
                            alt=""
                          />

                          <div className={style.story_info}>
                            <span className={style.story_heading}>
                              {val.stories[val.stories.length - 1].heading
                                .length > 34 ? (
                                <>
                                  {val.stories[
                                    val.stories.length - 1
                                  ].heading.slice(0, 34)}
                                  ...
                                </>
                              ) : (
                                val.stories[val.stories.length - 1].heading
                              )}
                            </span>
                            <span className={style.story_description}>
                              {val.stories[val.stories.length - 1].description
                                .length > 38 ? (
                                <>
                                  {val.stories[0].description.slice(0, 38)}...
                                </>
                              ) : (
                                val.stories[val.stories.length - 1].description
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {limit > stories.length && (
                      <button
                        onClick={() =>
                          handleLoadMoreStories(category, stories.length + 3)
                        }
                        className={style.see_more_btn}
                      >
                        {seeMoreload !== category ? (
                          "See more"
                        ) : (
                          <BeatLoader size={12} color="white" />
                        )}
                      </button>
                    )}
                  </>
                ) : (
                  <span className={style.no_story}>No stories Available</span>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default AllStories;
