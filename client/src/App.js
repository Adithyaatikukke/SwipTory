import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/homePage";
import StoryComponent from "./components/story/story";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bookMarkToggle,
  getLoggedinUserAysnc,
  getuserAllStoriesAysnc,
  stroyToggle,
  userStoryToggle,
  userToggle,
} from "./redux/user/userSlice";
import { getAllListedStoriesAsync } from "./redux/story/storySlice";

import ShareStoryPage from "./pages/ShareStoryPage/ShareStoryPage";
import { ToastContainer } from "react-toastify";
import BookmarkPage from "./pages/bookmarkPage/bookmarkPage";
import { refreshToggle } from "./redux/app/appSlice";

function App() {
  const dispatch = useDispatch();
  const toggle = useSelector(stroyToggle);
  const toggle1 = useSelector(userStoryToggle);
  const toggle2 = useSelector(bookMarkToggle);
  const toggle3 = useSelector(refreshToggle);

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
  }, [toggle, toggle2, toggle3]);
  useEffect(() => {
    handleGetUserAllStrories();
  }, [toggle1, toggle3]);

  return (
    <div className="app-container">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bookmark" element={<BookmarkPage />} />
          <Route path="/share/:id" element={<ShareStoryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
