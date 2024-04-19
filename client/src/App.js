import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/homePage";
import StoryComponent from "./components/story/story";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StoryComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
