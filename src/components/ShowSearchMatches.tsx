/// import axios from "axios";
import { useState, useEffect } from "react";
import { iRecentRecommendation } from "../Interface";
import { motion } from "framer-motion";
import { iUserData } from "../Interface";
import { baseURL } from "../utils/urls";
import axios from "axios";

interface IProps {
  filteredData: iRecentRecommendation[];
  loggedIn: iUserData;
  setLoggedIn: React.Dispatch<React.SetStateAction<iUserData>>;
}

export default function ShowSearchMatches(props: IProps): JSX.Element {
  const [isExpandedArray, setIsExpandedArray] = useState<boolean[]>([]);

  useEffect(() => {
    setIsExpandedArray(new Array(props.filteredData.length).fill(false));
  }, [props.filteredData.length]);

  const handleExpand = (i: number) => {
    const allFalseArray = new Array(isExpandedArray.length).fill(false);
    allFalseArray[i] = true;
    setIsExpandedArray(allFalseArray);
  };

  async function saveRecommendation(id: number, saved_rec: number) {
    const result = await axios.put(
      baseURL + "users/saved/" + id + "/" + saved_rec
    );
    props.setLoggedIn(result.data[0]);
  }

  return (
    <div className="search-component">
      <h1>Search Results</h1>
      <div className="search-results">
        {props.filteredData?.map((x, i) => (
          <motion.div
            layout
            className={"search-tile " + x.content_type + " clickable"}
            key={x.id}
            onClick={() => handleExpand(i)}
          >
            {props.loggedIn.user_id !== -1 && (
              <div
                className={
                  props.loggedIn.saved_recommendations.includes(x.id)
                    ? "fa fa-star checked"
                    : "fa fa-star"
                }
                onClick={() => {
                  !props.loggedIn.saved_recommendations.includes(x.id) &&
                    saveRecommendation(props.loggedIn.user_id, x.id);
                }}
              ></div>
            )}
            <h1>{x.title}</h1>
            <p>Author: {x.author}</p>
            <a href={x.url}>Vist</a>
            <p>{x.rating}</p>

            <div className="tags">
              {x.tags.map((y, idx) => (
                <p className="tag" key={idx}>
                  #{y}
                </p>
              ))}
            </div>

            {isExpandedArray[i] && (
              <motion.div layout className="search-tile-description">
                <p>{x.description}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
