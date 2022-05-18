import Popup from "reactjs-popup";
import axios from "axios";
import { useEffect, useState } from "react";
import { iPostRecommendation } from "../Interface";
import { baseURL } from "../utils/urls";
import { contentList } from "../utils/optionsList";
import { recommendationList } from "../utils/optionsList";
import { buildWeekList } from "../utils/optionsList";

interface Props {
  user_id: number;
}

export default function PopUpPost(props: Props): JSX.Element {
  const emptyPostData = {
    author: "",
    user_id: -1,
    url: "",
    title: "",
    description: "",
    tags: [],
    content_type: "book",
    rating: "✅",
    reason: "",
    build_week: 1,
  };

  //   const handleChange = (event: {target: {name:string, value: number|string}}) =>
  //     { const {name, value} = event.target;
  // setPostData((prevState => ({…prevState, [name]: value})));
  //     }

  const [postData, setPostData] = useState<iPostRecommendation>(emptyPostData);
  const [tag, setTag] = useState<string>("");

  async function submitClick() {
    if (
      postData.author !== "" &&
      postData.url !== "" &&
      postData.tags.length !== 0
    ) {
      await axios.post(baseURL, postData);
      setPostData(emptyPostData);
      window.alert("your recommendation was successfully posted");
    } else {
      window.alert("please fill the required fields before submitting");
    }
  }

  useEffect(() => {
    const updateUserID = () => {
      setPostData((prevState) => ({
        ...prevState,
        user_id: props.user_id,
      }));
    };
    updateUserID();
  }, [props.user_id]);

  return (
    <Popup
      trigger={<button className="button"> New Recommendation </button>}
      modal
      nested
    >
      {(close: () => void) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Modal Title </div>
          <input
            placeholder="Title"
            value={postData.title}
            onChange={(e) =>
              setPostData((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
          ></input>

          <input
            placeholder="Author"
            value={postData.author!}
            onChange={(e) =>
              setPostData((prevState) => ({
                ...prevState,
                author: e.target.value,
              }))
            }
          ></input>

          <input
            placeholder="URL"
            value={postData.url}
            onChange={(e) =>
              setPostData((prevState) => ({
                ...prevState,
                url: e.target.value,
              }))
            }
          ></input>

          <input
            placeholder="Description"
            value={postData.description!}
            onChange={(e) =>
              setPostData((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          ></input>

          <input
            placeholder="Reason"
            value={postData.reason!}
            onChange={(e) =>
              setPostData((prevState) => ({
                ...prevState,
                reason: e.target.value,
              }))
            }
          ></input>

          <select
            onChange={(e) =>
              setPostData((prevState) => ({
                ...prevState,
                recommendation: e.target.value,
              }))
            }
          >
            {recommendationList.map((rec, idx) => (
              <option key={idx}>{rec}</option>
            ))}
          </select>

          <select
            onChange={(e) =>
              setPostData((prevState) => ({
                ...prevState,
                content_type: e.target.value,
              }))
            }
          >
            {contentList.map((content, idx) => (
              <option key={idx}>{content}</option>
            ))}
          </select>

          <select
            onChange={(e) =>
              setPostData((prevState) => ({
                ...prevState,
                build_week: parseInt(e.target.value),
              }))
            }
          >
            {buildWeekList.map((weekNumber, idx) => (
              <option key={idx}>{weekNumber}</option>
            ))}
          </select>

          <br />
          <h4>Add Tag</h4>
          <input
            placeholder="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          ></input>
          <button
            onClick={() => {
              if (tag === "") {
                window.alert("empty tag not accepted");
              } else {
                setPostData((prevState) => ({
                  ...prevState,
                  tags: [...prevState.tags, tag],
                }));
                setTag("");
              }
            }}
          >
            add tag
          </button>
          {postData.tags.map((tag, idx) => (
            <li key={idx}>{tag}</li>
          ))}
          <div className="actions">
            <button
              onClick={() => {
                submitClick();
                close();
              }}
            >
              Submit Recommendation
            </button>
          </div>

          <br />
        </div>
      )}
    </Popup>
  );
}
