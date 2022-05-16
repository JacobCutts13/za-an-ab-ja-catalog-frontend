import ShowRecent from "./components/ShowRecent";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import "./style.css";

function App(): JSX.Element {
  return (
    <>
      <Header />
      <ShowRecent />
      <SearchBar />
    </>
  );
}

export default App;
