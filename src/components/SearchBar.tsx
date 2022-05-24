import { useState, useEffect } from "react";
import { baseURL } from "../utils/urls";
import { iRecentRecommendation } from "../Interface";
import ShowSearchMatches from "./ShowSearchMatches";
import PopularTags from "./PopularTags";
import { iUserData } from "../Interface";

interface Props {
  loggedIn: iUserData;
  setLoggedIn: React.Dispatch<React.SetStateAction<iUserData>>;
  togglePostRefresh: boolean;
}

export default function SearchBar(props: Props): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [selector, setSelector] = useState<string>("All");
  const [filteredData, setFilteredData] = useState<iRecentRecommendation[]>();
  const [clearSearch, setClearSearch] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllData = async () => {
      const response = await fetch(baseURL + "All");
      const jsonBody: iRecentRecommendation[] = await response.json();
      setFilteredData(jsonBody);
    };
    fetchAllData();
  }, [clearSearch, props.togglePostRefresh]);

  const handleSearchClick = async () => {
    if (search !== "") {
      const response = await fetch(baseURL +"search/"+ selector + "/" + search);
      const jsonBody: iRecentRecommendation[] = await response.json();
      setFilteredData(jsonBody);
    }
  };

  return (
    <>
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="search-input"
      ></input>
      <select onChange={(e) => setSelector(e.target.value)} value={selector}>
        <option>All</option>
        <option>author</option>
        <option>title</option>
      </select>
      <button onClick={() => handleSearchClick()} className="search-submit">
        Search
      </button>
      <button
        onClick={() => {
          setClearSearch(!clearSearch);
          setSearch("");
        }}
      >
        Clear Search
      </button>
      <PopularTags setFilteredData={setFilteredData} />
      {filteredData !== undefined && (
        <>
          <h1>Search Results</h1>
          <ShowSearchMatches
            filteredData={filteredData}
            loggedIn={props.loggedIn}
            setLoggedIn={props.setLoggedIn}
          />
        </>
      )}
    </>
  );
}
