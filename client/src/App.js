import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/homePage";
import StoryComponent from "./components/story/story";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedinUserAysnc,
  getuserAllStoriesAysnc,
  stroyToggle,
} from "./redux/user/userSlice";
import { getAllListedStoriesAsync } from "./redux/story/storySlice";

function App() {
  const dispatch = useDispatch();
  const toggle = useSelector(stroyToggle);

  const handleGetLoggedinUser = () => {
    dispatch(getLoggedinUserAysnc());
  };

  const handleGetAllListedStories = () => {
    dispatch(getAllListedStoriesAsync());
  };
  const handleGetUserAllStrories = () => {
    dispatch(getuserAllStoriesAysnc());
  };
  useEffect(() => {
    if (localStorage.getItem("TOKEN")) {
      handleGetLoggedinUser();
    }

    handleGetAllListedStories();
  }, [toggle]);
  useEffect(() => {
    handleGetUserAllStrories();
  }, []);
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
