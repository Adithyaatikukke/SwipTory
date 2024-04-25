import axios from "axios";
import { getToken } from "../../components/utils/getToken";

export const getAllStories = (data) => {
  if (!data) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_API}/node/api/v1/story/stories`
    );
  } else {
    const {
      foodLimit,
      fitnessLimit,
      travelLimit,
      moviesLimit,
      educationLimit,
    } = data;
    return axios.get(
      `${process.env.REACT_APP_BACKEND_API}/node/api/v1/story/stories?foodLimit=${foodLimit}&finessLimit=${fitnessLimit}&travelLimit=${travelLimit}&moviesLimit=${moviesLimit}&educationLimit=${educationLimit}`
    );
  }
};

export const getShareStory = (id) => {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_API}/node/api/v1/story/shareStory/${id}`
  );
};
export const likeStory = (data) => {
  const config = getToken();
  return axios.post(
    `${process.env.REACT_APP_BACKEND_API}/node/api/v1/story/likeordislike`,
    data,
    config
  );
};
