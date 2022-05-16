import ShowRecent from "./components/ShowRecent";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import Post from "./components/Post";
import Saved from "./components/Saved";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./style.css";

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header /> <ShowRecent /> <SearchBar />
              </>
            }
          />
          <Route path="/post" element={<Post />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
