import React, { useEffect, useState } from "react";
import style from "./addStory.module.css";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  editStory,
  setAddStoryMode,
  setEditStory,
  toggle,
} from "../../redux/app/appSlice";
import { BeatLoader } from "react-spinners";
import {
  createStoryAysnc,
  stroyToggle,
  userFatching,
  userToggle,
} from "../../redux/user/userSlice";

const AddStory = () => {
  const dispatch = useDispatch();
  const toggle1 = useSelector(stroyToggle);
  const toggle2 = useSelector(toggle);
  const isFetching = useSelector(userFatching);
  const userEditStory = useSelector(editStory);
  const editValue = JSON.stringify(userEditStory);

  const [category, setCategory] = useState("Food");
  const [isLoading, setIsloading] = useState(false);
  const [slides, setSlides] = useState(
    userEditStory?.stories?.length > 0
      ? JSON.parse(editValue).stories
      : [
          { id: 1, heading: "", description: "", image: "" },
          { id: 2, heading: "", description: "", image: "" },
          { id: 3, heading: "", description: "", image: "" },
        ]
  );
  const [selectSlide, setSelectSlide] = useState(slides[0]);
  const [error, setError] = useState(false);

  const slide = {
    id: 1,
    heading: "",
    description: "",
    image: "",
  };

  const handleRemoveSlide = (rmId) => {
    if (rmId <= 3) return;

    const filterSlides = slides.filter(({ id }) => id !== rmId);
    for (let i = 0; i < filterSlides.length; i++) {
      filterSlides[i].id = i + 1;
    }

    if (selectSlide.id === rmId) {
      handleSetPrevSelectValue(filterSlides[filterSlides.length - 1]);
    }
    setSlides(filterSlides);
  };

  const handleSetValuesToSlides = (index, value, type) => {
    if (type === "HEADER") {
      const val = slides.find(({ id }) => id === index);
      const filterVal = slides.filter(({ id }) => id !== index);
      val.heading = value;
      filterVal.push(val);

      for (let i = 0; i < filterVal.length; i++) {
        let minVal = i;
        for (let j = i + 1; j < filterVal.length; j++) {
          if (filterVal[j].id < filterVal[minVal].id) {
            minVal = j;
          }
        }
        if (i !== minVal) {
          [filterVal[i], filterVal[minVal]] = [filterVal[minVal], filterVal[i]];
        }
      }
      setSelectSlide(val);
      setSlides(filterVal);
    } else if (type === "DESCRIPTION") {
      const val = slides.find(({ id }) => id === index);
      const filterVal = slides.filter(({ id }) => id !== index);
      val.description = value;
      filterVal.push(val);

      for (let i = 0; i < filterVal.length; i++) {
        let minVal = i;
        for (let j = i + 1; j < filterVal.length; j++) {
          if (filterVal[j].id < filterVal[minVal].id) {
            minVal = j;
          }
        }
        if (i !== minVal) {
          [filterVal[i], filterVal[minVal]] = [filterVal[minVal], filterVal[i]];
        }
      }
      setSelectSlide(val);
      setSlides(filterVal);
    } else if (type === "IMAGE") {
      const val = slides.find(({ id }) => id === index);
      const filterVal = slides.filter(({ id }) => id !== index);
      val.image = value;
      filterVal.push(val);

      for (let i = 0; i < filterVal.length; i++) {
        let minVal = i;
        for (let j = i + 1; j < filterVal.length; j++) {
          if (filterVal[j].id < filterVal[minVal].id) {
            minVal = j;
          }
        }
        if (i !== minVal) {
          [filterVal[i], filterVal[minVal]] = [filterVal[minVal], filterVal[i]];
        }
      }
      setSelectSlide(val);
      setSlides(filterVal);
    }
  };

  const handleChangeSlide = (slideId) => {
    setSelectSlide(slides.find(({ id }) => id === slideId));
  };

  const handleAddSlide = () => {
    setSlides([...slides, { ...slide, id: slides[slides.length - 1].id + 1 }]);
    setSelectSlide({ ...slide, id: slides[slides.length - 1].id + 1 });
  };

  const handleSetPrevSelectValue = (value) => {
    setSelectSlide(value);
  };

  const handleSetAddStoryPage = () => {
    dispatch(setAddStoryMode());
    dispatch(setEditStory([]));
  };

  const handleSubmit = () => {
    try {
      setError(false);

      for (let slide of slides) {
        if (
          !slide.id ||
          !slide.heading ||
          !category ||
          !slide.description ||
          !slide.image
        ) {
          setError(true);
          return;
        }
      }
      setError(false);
      setIsloading(true);
      dispatch(createStoryAysnc({ story: slides, category }));
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleNextSlide = () => {
    setSelectSlide(slides.find(({ id }) => id === selectSlide.id + 1));
  };
  const handlePrevSlide = () => {
    setSelectSlide(slides.find(({ id }) => id === selectSlide.id - 1));
  };

  useEffect(() => {
    if (isLoading) {
      setIsloading(false);
      handleSetAddStoryPage();
    }
  }, [toggle1]);

  return (
    <>
      <section className={style.addstory_container}>
        <IoMdClose
          onClick={() => handleSetAddStoryPage()}
          className={style.close_modal}
        />
        <div className={style.addstory_section}>
          <span className={style.sm_text}>Add upto 6 slides</span>
          <div className={style.addstory_up_box}>
            {slides.map(({ id }) => (
              <span
                className={`${
                  selectSlide.id === id ? style.slide_border : style.slide
                }`}
                key={id}
              >
                <span
                  className={style.change_slide}
                  onClick={() => handleChangeSlide(id)}
                >
                  {`Slide ${id}`}
                </span>

                {id > 3 && (
                  <IoMdClose
                    onClick={() => handleRemoveSlide(id)}
                    className={style.close_icon}
                  />
                )}
              </span>
            ))}
            {slides.length <= 5 && (
              <span onClick={() => handleAddSlide()} className={style.add}>
                Add +
              </span>
            )}
          </div>
          <div className={style.addstory_down_box}>
            <div className={style.inputs_section}>
              <div className={style.labeles_box}>
                <span className={style.heading_label}>Heading :</span>
                <span className={style.description_label}>Description :</span>
                <span className={style.image_label}>Image :</span>
                <span className={style.category_label}>Category :</span>
              </div>
              <div className={style.inputs_box}>
                <input
                  onChange={(e) =>
                    handleSetValuesToSlides(
                      selectSlide.id,
                      e.target.value,
                      "HEADER"
                    )
                  }
                  className={style.heading_input}
                  value={selectSlide.heading}
                  placeholder="Your heading"
                  type="text"
                />
                <textarea
                  onChange={(e) =>
                    handleSetValuesToSlides(
                      selectSlide.id,
                      e.target.value,
                      "DESCRIPTION"
                    )
                  }
                  className={style.description_input}
                  value={selectSlide.description}
                  placeholder="Story description"
                  type="text"
                />
                <input
                  onChange={(e) =>
                    handleSetValuesToSlides(
                      selectSlide.id,
                      e.target.value,
                      "IMAGE"
                    )
                  }
                  className={style.image_input}
                  value={selectSlide.image}
                  placeholder="Your image url"
                  type="text"
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={style.category_input}
                >
                  <option value="Food">Food</option>
                  <option value="Health">Health</option>
                  <option value="Travel">Travel</option>
                  <option value="Movies">Movies</option>
                  <option value="Education">Education</option>
                </select>
              </div>
            </div>

            <span className={style.error}>
              {error ? "All fieilds must be filled!" : ""}
            </span>

            <div className={style.buttons_section}>
              <div className={style.btn_left}>
                <button
                  disabled={slides[0].id === selectSlide.id ? true : false}
                  onClick={() => handlePrevSlide()}
                  className={`${
                    slides[0].id === selectSlide.id
                      ? style.prev_disable
                      : style.prev
                  }`}
                >
                  Previous
                </button>
                <button
                  disabled={
                    slides[slides.length - 1].id === selectSlide.id
                      ? true
                      : false
                  }
                  onClick={() => handleNextSlide()}
                  className={`${
                    slides[slides.length - 1].id === selectSlide.id
                      ? style.next_disable
                      : style.next
                  }`}
                >
                  Next
                </button>
              </div>
              <button onClick={() => handleSubmit()} className={style.post}>
                {!isLoading ? (
                  userEditStory.length > 0 ? (
                    "Update"
                  ) : (
                    "Post"
                  )
                ) : (
                  <BeatLoader color="white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className={style.addstory_mobile_container}>
        <IoMdClose
          onClick={() => handleSetAddStoryPage()}
          className={style.mobile_close_modal_icon}
        />
        <div className={style.addstory_mobile_section}>
          <span className={style.tag_line}>Add to story to feed</span>
          <div className={style.addstory_mobile_box}>
            <div className={style.mobile_slides}>
              {slides.map(({ id }) => (
                <span
                  className={`${
                    selectSlide.id === id
                      ? style.slide_mobile_border
                      : style.slide_mobile
                  }`}
                  key={id}
                >
                  <span
                    className={style.change_mobile_slide}
                    onClick={() => handleChangeSlide(id)}
                  >
                    Slide
                  </span>
                  <span>{id}</span>

                  {id > 3 && (
                    <IoMdClose
                      onClick={() => handleRemoveSlide(id)}
                      className={style.close_mobile_icon}
                    />
                  )}
                </span>
              ))}
              {slides.length <= 5 && (
                <span
                  onClick={() => handleAddSlide()}
                  className={style.mobile_add}
                >
                  Add +
                </span>
              )}
            </div>
            <div className={style.addStory_mobile_inputs_box}>
              <div className={style.mobile_input}>
                <span>Heading</span>
                <input
                  onChange={(e) =>
                    handleSetValuesToSlides(
                      selectSlide.id,
                      e.target.value,
                      "HEADER"
                    )
                  }
                  value={selectSlide.heading}
                  type="text"
                />
              </div>
              <div className={style.mobile_input}>
                <span>Description</span>
                <textarea
                  onChange={(e) =>
                    handleSetValuesToSlides(
                      selectSlide.id,
                      e.target.value,
                      "DESCRIPTION"
                    )
                  }
                  type="text"
                  value={selectSlide.description}
                />
              </div>
              <div className={style.mobile_input}>
                <span>Image</span>
                <input
                  onChange={(e) =>
                    handleSetValuesToSlides(
                      selectSlide.id,
                      e.target.value,
                      "IMAGE"
                    )
                  }
                  value={selectSlide.image}
                  type="text"
                />
              </div>
              <div className={style.mobile_input}>
                <span>Category</span>
                <select
                  value={selectSlide.category}
                  onChange={(e) =>
                    handleSetValuesToSlides(
                      selectSlide.id,
                      e.target.value,
                      "CATEGORY"
                    )
                  }
                  className={style.mobile_category_input}
                >
                  <option value="food">Food</option>
                  <option value="Health">Health</option>
                  <option value="Travel">Travel</option>
                  <option value="Movies">Movies</option>
                  <option value="Education">Education</option>
                </select>
              </div>
            </div>
          </div>
          <span className={style.mobile_error}>
            {error ? "All fieilds must be filled!" : ""}
          </span>
          <button onClick={() => handleSubmit()} className={style.mobile_post}>
            {userEditStory.length > 0 ? "Update" : "Post"}
          </button>
        </div>
      </section>
    </>
  );
};

export default AddStory;
