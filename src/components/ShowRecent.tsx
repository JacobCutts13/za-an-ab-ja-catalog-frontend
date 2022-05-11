// import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { baseURL } from "../utils/urls";
// import { frontendURL } from "../utils/urls";
import iRecentRecommendation from "../Interface";

export default function ShowRecent(): JSX.Element {
  const [recommendation, setRecommendation] =
    useState<iRecentRecommendation[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(baseURL + "recent");
      const jsonBody: iRecentRecommendation[] = await response.json();
      setRecommendation(jsonBody);
    };
    fetchData();
  }, []);

  return (
    <div className="recent-component">
      <h1>Recent Recommendations</h1>
      <div className="recent-slider">
        {recommendation?.map((x) => (
          <div className={"recommendation-tile " + x.content_type} key={x.id}>
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
          </div>
        ))}
      </div>
    </div>
  );
}
