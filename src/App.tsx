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
  const [togglePostRefresh, setTogglePostRefresh] = useState<boolean>(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  togglePostRefresh={togglePostRefresh}
                  setTogglePostRefresh={setTogglePostRefresh}
                />{" "}
                <ShowRecent
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  togglePostRefresh={togglePostRefresh}
                />{" "}
                <SearchBar
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  togglePostRefresh={togglePostRefresh}
                />
              </>
            }
          />
          <Route
            path="/saved"
            element={
              <Saved
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                togglePostRefresh={togglePostRefresh}
                setTogglePostRefresh={setTogglePostRefresh}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
