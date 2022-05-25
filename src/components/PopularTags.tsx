import { useState, useEffect } from "react";
import { baseURL } from "../utils/urls";
import { iRecentRecommendation } from "../Interface";

interface IProps {
  setFilteredData: React.Dispatch<
    React.SetStateAction<iRecentRecommendation[] | undefined>
  >;
}

export default function PopularTags(props: IProps): JSX.Element {
  const [tags, setTags] = useState<string[]>();

  useEffect(() => {
    const fetchAllTags = async () => {
      const response = await fetch(baseURL + "All");
      const jsonBody: iRecentRecommendation[] = await response.json();
      const tagsArray = jsonBody.map((x) => x.tags);
      const emptyArray: string[] = [];
      const mergedTagsArray = emptyArray.concat(...tagsArray);
      setTags(mergedTagsArray);
    };
    fetchAllTags();
  }, []);

  async function fetchFilteredTags(tagName: string) {
    console.log(baseURL + "tags/" + tagName);
    const response = await fetch(baseURL + "tags/" + tagName);
    const jsonBody: iRecentRecommendation[] = await response.json();
    props.setFilteredData(jsonBody);
  }

  return (
    <>
    <div className="all">
      <h2>Popular Tags</h2>

      {tags
        ?.filter((tag, idx, tags) => tags.indexOf(tag) === idx)
        .map((tag, idx) => (
          <div
            key={idx}
            className="popularTags"
            onClick={() => fetchFilteredTags(tag)}
          >
            {tag}
          </div>
        ))}
           </div>
    </>
  );
}
