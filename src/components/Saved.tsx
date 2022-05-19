import { useState, useEffect } from "react";
import { baseURL } from "../utils/urls";
import { iRecentRecommendation } from "../Interface";
import ShowSearchMatches from "./ShowSearchMatches";
import { iUserData } from "../Interface";
import Header from "./Header";

interface Props {
  loggedIn: iUserData;
  setLoggedIn: React.Dispatch<React.SetStateAction<iUserData>>;
}

export default function Saved(props: Props): JSX.Element {
  console.log(props.loggedIn.user_id);
  const [savedRecoms, setSavedRecoms] = useState<iRecentRecommendation[]>([]);
  useEffect(() => {
    const fetchSavedRecoms = async () => {
      const response = await fetch(
        baseURL + "users/saved/" + props.loggedIn.user_id
      );
      const jsonBody: iRecentRecommendation[] = await response.json();
      setSavedRecoms(jsonBody);
    };
    fetchSavedRecoms();
  }, [props.loggedIn]);
  return (
    <>
      <Header loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />
      <>
        <h1>{props.loggedIn.name}'s Saved Recommendations</h1>
        <ShowSearchMatches
          filteredData={savedRecoms}
          loggedIn={props.loggedIn}
          setLoggedIn={props.setLoggedIn}
        />
      </>
    </>
  );
}
