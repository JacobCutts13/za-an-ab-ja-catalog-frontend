/// import axios from "axios";
import { useState, useEffect } from "react";
import iRecentRecommendation from "../Interface";
import { motion } from "framer-motion";

interface IProps {
  filteredData: iRecentRecommendation[];
}

export default function ShowSearchMatches(Props: IProps): JSX.Element {
  const [isExpandedArray, setIsExpandedArray] = useState<boolean[]>([]);

  useEffect(() => {
    setIsExpandedArray(new Array(Props.filteredData.length).fill(false));
  }, [Props.filteredData.length]);

  const handleExpand = (i: number) => {
    const allFalseArray = new Array(isExpandedArray.length).fill(false);
    allFalseArray[i] = true;
    setIsExpandedArray(allFalseArray);
  };

  return (
    <div className="search-component">
      <h1>Search Results</h1>
      <div className="search-results">
        {Props.filteredData?.map((x, i) => (
          <motion.div
            layout
            className={"search-tile " + x.content_type + " clickable"}
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
