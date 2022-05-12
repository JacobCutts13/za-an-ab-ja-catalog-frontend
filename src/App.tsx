import ShowRecent from "./components/ShowRecent";
import ShowSearchMatches from "./components/ShowSearchMatches";
import SearchBar from "./components/SearchBar";
import "./style.css";

function App(): JSX.Element {
  return (
    <>
      <ShowRecent />
      <SearchBar />
      <ShowSearchMatches />
    </>
  );
}

export default App;
