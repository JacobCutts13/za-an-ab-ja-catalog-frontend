import ShowRecent from "./components/ShowRecent";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom"; 
import "./style.css";

function App(): JSX.Element {
  return (
     
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<><Header /> <ShowRecent /> <SearchBar /></>} />

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
