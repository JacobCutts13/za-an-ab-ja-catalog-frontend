/// import axios from "axios";
import { useState, useEffect } from "react";
import { baseURL } from "../utils/urls";
// import { frontendURL } from "../utils/urls";
import iRecentRecommendation from "../Interface";
import { motion } from "framer-motion";

export default function ShowSearchMatches(): JSX.Element {
  const [searchRecommendation, setSearchRecommendation] =
    useState<iRecentRecommendation[]>();

  const [isExpandedArray, setIsExpandedArray] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(baseURL + "recent");
      const jsonBody: iRecentRecommendation[] = await response.json();
      setSearchRecommendation(jsonBody);
      setIsExpandedArray(new Array(jsonBody.length).fill(false));
    };
    fetchData();
  }, []);

  const handleExpand = (i: number) => {
    setIsExpandedArray([
      ...isExpandedArray.slice(0, i),
      !isExpandedArray[i],
      ...isExpandedArray.splice(-i),
    ]);
  };

  return (
    <div className="search-component">
      <h1>Search Results</h1>
      <div className="search-results">
        {searchRecommendation?.map((x, i) => (
          <motion.div
            layout
            className={"search-tile " + x.content_type}
            key={x.id}
            onClick={() => handleExpand(i)}
          >
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
              <motion.div layout>
                <p>{x.description}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
