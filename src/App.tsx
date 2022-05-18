import ShowRecent from "./components/ShowRecent";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import Saved from "./components/Saved";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./style.css";
import { emptyUserData } from "./utils/emptyUserData";
import { useState } from "react";
import { iUserData } from "./Interface";

function App(): JSX.Element {
  const [loggedIn, setLoggedIn] = useState<iUserData>(emptyUserData);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />{" "}
                <ShowRecent loggedIn={loggedIn} setLoggedIn={setLoggedIn} />{" "}
                <SearchBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              </>
            }
          />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
