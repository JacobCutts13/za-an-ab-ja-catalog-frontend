/// import axios from "axios";
import { useState, useEffect } from "react";
import { iRecentRecommendation } from "../Interface";
import { motion } from "framer-motion";
import { iUserData } from "../Interface";
import { baseURL } from "../utils/urls";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { iLikes } from "../Interface";

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
    if (!props.loggedIn.saved_recommendations.includes(saved_rec)) {
      const result = await axios.patch(
        baseURL + "users/addsaved/" + id + "/" + saved_rec
      );
      props.setLoggedIn(result.data[0]);
    } else {
      const result = await axios.patch(
        baseURL + "users/removesaved/" + id + "/" + saved_rec
      );
      props.setLoggedIn(result.data[0]);
    }
  }
  const [likedRecom, setLikedRecom] = useState<iLikes[]>([]);
  useEffect(() => {
    const fetchLikes = async () => {
      const response = await fetch(baseURL + "likes/" + props.loggedIn.user_id);
      const jsonBody: iLikes[] = await response.json();
      setLikedRecom(jsonBody);
      console.log(jsonBody);
    };
    fetchLikes();
  }, [props.loggedIn]);

  console.log(likedRecom);

  return (
    <div className="search-component">
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
                  saveRecommendation(props.loggedIn.user_id, x.id);
                }}
              ></div>
            )}
            <h1>{x.title}</h1>
            <p>Author: {x.author}</p>
            <p>{x.content_type}</p>
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
