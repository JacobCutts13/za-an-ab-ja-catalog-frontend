/// import axios from "axios";
import { useState, useEffect } from "react";
import { iRecentRecommendation } from "../Interface";
import { motion } from "framer-motion";
import { iUserData } from "../Interface";
import { baseURL } from "../utils/urls";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import { iLikes } from "../Interface";
import getLikesFromId from "../utils/getLikesFromId";

interface IProps {
  filteredData: iRecentRecommendation[];
  loggedIn: iUserData;
  setLoggedIn: React.Dispatch<React.SetStateAction<iUserData>>;
}

export default function ShowSearchMatches(props: IProps): JSX.Element {
  const [isExpandedArray, setIsExpandedArray] = useState<boolean[]>([]);
  const [likedRecom, setLikedRecom] = useState<iLikes[]>([]);

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

  useEffect(() => {
    const fetchLikes = async () => {
      const response = await fetch(baseURL + "likes/" + props.loggedIn.user_id);
      const jsonBody: iLikes[] = await response.json();
      setLikedRecom(jsonBody);
    };
    if (props.loggedIn.user_id !== -1) {
      fetchLikes();
    }
  }, [props.loggedIn]);

  const handleLike = async (
    postId: number,
    likedValue: number,
    justLiked: boolean
  ) => {
    let postLikeValue = 0;
    if (likedValue === 0) {
      postLikeValue = justLiked ? 1 : -1;
    } else if (likedValue === 1) {
      postLikeValue = justLiked ? -1 : -2;
    } else if (likedValue === -1) {
      postLikeValue = justLiked ? 2 : 1;
    }
    await axios.post(baseURL + "likes", {
      userid: props.loggedIn.user_id,
      postid: postId,
      likes: postLikeValue,
    });

    const newLikeValue = likedValue + postLikeValue;
    const filteredLikedRecom = likedRecom.filter(
      (recom) => recom.post_id !== postId
    );
    filteredLikedRecom.push({ post_id: postId, likes: newLikeValue });
    setLikedRecom(filteredLikedRecom);
  };

  return (
    <div className="search-component">
      <div className="search-results">
        {props.filteredData?.map((recom, i) => {
          const likeValue = getLikesFromId(recom.id, likedRecom);
          return (
            <motion.div
              layout
              className={"search-tile " + recom.content_type + " clickable"}
              key={recom.id}
              onClick={() => handleExpand(i)}
            >
              {props.loggedIn.user_id !== -1 && (
                <div
                  className={
                    props.loggedIn.saved_recommendations.includes(recom.id)
                      ? "fa fa-star checked"
                      : "fa fa-star"
                  }
                  onClick={() => {
                    saveRecommendation(props.loggedIn.user_id, recom.id);
                  }}
                ></div>
              )}
              <h1>{recom.title}</h1>
              <p>Author: {recom.author}</p>
              <p>{recom.content_type}</p>
              <a href={recom.url}>Vist</a>
              <p>{recom.rating}</p>
              <div className="tags">
                {recom.tags.map((tag, idx) => (
                  <p className="tag" key={idx}>
                    #{tag}
                  </p>
                ))}
              </div>
              <FontAwesomeIcon
                onClick={() => handleLike(recom.id, likeValue, true)}
                icon={solid("heart")}
                className={likeValue === 1 ? "red" : ""}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <FontAwesomeIcon
                onClick={() => handleLike(recom.id, likeValue, false)}
                icon={solid("heart-broken")}
                className={likeValue === -1 ? "red" : ""}
              />
              {isExpandedArray[i] && (
                <motion.div layout className="search-tile-description">
                  <p>{recom.description}</p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
