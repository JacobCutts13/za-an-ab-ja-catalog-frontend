import { useState, useEffect } from "react";
import { baseURL } from "../utils/urls";
import iRecentRecommendation from "../Interface";

export default function SearchBar(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [selector, setSelector] = useState<string>("");
  const [filteredData, setFilteredData] = useState<iRecentRecommendation[]>();

  const fetchAllData = async () => {
    const response = await fetch(baseURL);
    const jsonBody: iRecentRecommendation[] = await response.json();
    return jsonBody;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const response = await fetch(baseURL + "All");
      const jsonBody: iRecentRecommendation[] = await response.json();
      setFilteredData(jsonBody);
    };
      fetchAllData();
 
  }, []);


const handleSearchClick = async ()  => {
    const response = await fetch(baseURL + selector + "/" + search);
    const jsonBody: iRecentRecommendation[] = await response.json();
    setFilteredData(jsonBody);
}

  return (
    <>
      <input onChange={(e) => setSearch(e.target.value)}></input>
      <select onChange={(e) => setSelector(e.target.value)} value={selector}>
        <option>All</option>
        <option>author</option>
        <option>title</option>
      </select>
      <button onClick={() => handleSearchClick()}>Search</button>

    </>
  );
}
