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
    <>
      {recommendation?.map((x) => (
        <div key={x.id}>
          <h1>{x.title}</h1>
          <p>{x.author}</p>
          <a href={x.url}>{x.url}</a>
          <p>{x.rating}</p>
          <p>{x.description}</p>

          {x.tags.map((x, idx) => (
            <li key={idx}>{x}</li>
          ))}
        </div>
      ))}
    </>
  );
}
