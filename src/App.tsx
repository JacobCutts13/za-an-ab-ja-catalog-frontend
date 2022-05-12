import ShowRecent from "./components/ShowRecent";
import ShowSearchMatches from "./components/ShowSearchMatches";
import "./style.css";

function App(): JSX.Element {
  return (
    <>
      <ShowRecent />
      <ShowSearchMatches />
    </>
  );
}

export default App;
