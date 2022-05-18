// import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { baseURL } from "../utils/urls";
// import { frontendURL } from "../utils/urls";
import { iRecentRecommendation } from "../Interface";
import { motion } from "framer-motion";
import axios from "axios";
import { iUserData } from "../Interface";

interface Props {
  loggedIn: iUserData;
  setLoggedIn: React.Dispatch<React.SetStateAction<iUserData>>;
}

export default function ShowRecent(props: Props): JSX.Element {
  const [recommendation, setRecommendation] =
    useState<iRecentRecommendation[]>();

  const [sliderWidth, setSliderWidth] = useState<number>(0);
  // const [saved, setSaved] = useState<{user_id:number; saved_recommendation:number[]}>();
  // console.log(props.loggedIn)

  const recentSlider = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(baseURL + "recent");
      const jsonBody: iRecentRecommendation[] = await response.json();
      setRecommendation(jsonBody);
    };
    fetchData();
    if (recentSlider.current !== null) {
      setSliderWidth(recentSlider.current.scrollWidth);
    }
  }, []);

  async function saveRecommendation(id: number, saved_rec: number) {
    const result = await axios.put(
      baseURL + "users/saved/" + id + "/" + saved_rec
    );
    props.setLoggedIn(result.data[0]);
  }

  return (
    <div className="recent-component">
      <h1>Recent Recommendations</h1>
      <motion.div
        className="recent-slider"
        ref={recentSlider}
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className="inner-recent-slider"
          drag="x"
          dragConstraints={{ right: 0, left: -sliderWidth }}
        >
          {recommendation?.map((x) => (
            <motion.div
              className={"recommendation-tile " + x.content_type}
              key={x.id}
            >
              {props.loggedIn.user_id !== -1 && (
                <div
                  className={
                    props.loggedIn.saved_recommendations.includes(x.id)
                      ? "fa fa-star checked"
                      : "fa fa-star"
                  }
                  onClick={() =>
                    saveRecommendation(props.loggedIn.user_id, x.id)
                  }
                ></div>
              )}
              <h1>{x.title}</h1>
              <p>Author: {x.author}</p>

              <a href={x.url}>Vist</a>
              <p>{x.rating}</p>
              <p>{x.description}</p>
              <div className="tags">
                {x.tags.map((y, idx) => (
                  <p className="tag" key={idx}>
                    #{y}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
