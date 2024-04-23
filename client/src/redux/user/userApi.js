import axios from "axios";
import { getToken } from "../../components/utils/getToken";
export const registerUser = (data) => {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_API}/node/api/v1/user/register`,
    data
  );
};
export const getloggedinUser = (data) => {
  const config = getToken();

  return axios.get(
    `${process.env.REACT_APP_BACKEND_API}/node/api/v1/user`,
    config
  );
};

export const loginUser = (data) => {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_API}/node/api/v1/user/login`,
    data
  );
};
export const createStory = (data) => {
  const config = getToken();
  return axios.post(
    `${process.env.REACT_APP_BACKEND_API}/node/api/v1/story/create`,
    data,
    config
  );
};
export const getUserAllStories = () => {
  const config = getToken();
  return axios.get(
    `${process.env.REACT_APP_BACKEND_API}/node/api/v1/user/allStories`,

    config
  );
};
