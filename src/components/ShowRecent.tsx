// import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { baseURL } from "../utils/urls";
// import { frontendURL } from "../utils/urls";
import { iRecentRecommendation } from "../Interface";
import { motion } from "framer-motion";
import axios from "axios";

interface iProps {
  user_id: number;
}

export default function ShowRecent(props: iProps): JSX.Element {
  const [recommendation, setRecommendation] =
    useState<iRecentRecommendation[]>();

  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const [saved, setSaved] = useState({ user_id: -1, post_id: -1 });

  const recentSlider = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(baseURL + "recent");
      const jsonBody: iRecentRecommendation[] = await response.json();
      setRecommendation(jsonBody);
    };
    fetchData();
    if (recentSlider.current !== null) {
      console.log(
        recentSlider.current.scrollWidth,
        recentSlider.current.offsetWidth
      );
      setSliderWidth(recentSlider.current.scrollWidth);
    }
  }, []);

  async function saveRecommendation(id: number, saved_rec: number) {
    const result = await axios.put(
      baseURL + "users/saved/" + id + "/" + saved_rec
    );
    console.log(result);
    //setSaved([...saved, )
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
              <div
                className="fa fa-star checked"
                onClick={() => saveRecommendation}
              ></div>
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
