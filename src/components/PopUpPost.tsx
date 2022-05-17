import Popup from "reactjs-popup";
import axios from "axios";
import { useState } from "react";
import { iPostRecommendation } from "../Interface";
import { baseURL } from "../utils/urls";
import { contentList } from "../utils/optionsList";
import { recommendationList } from "../utils/optionsList";

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
    content_type: "",
    rating: "",
    reason: "",
    build_week: -1,
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
    } else {
      window.alert("please fill the required fields before submitting");
    }
  }

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
            onChange={(e) =>
              setPostData((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
          ></input>

          <input
            placeholder="Author"
            onChange={(e) =>
              setPostData((prevState) => ({
                ...prevState,
                author: e.target.value,
              }))
            }
          ></input>

          <input
            placeholder="URL"
            onChange={(e) =>
              setPostData((prevState) => ({
                ...prevState,
                URL: e.target.value,
              }))
            }
          ></input>

          <input
            placeholder="Description"
            onChange={(e) =>
              setPostData((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          ></input>

          <input
            placeholder="Reason"
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
            <button onClick={submitClick}>Submit Recommendation</button>
            <button
              className="button"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              {console.log(postData)}
              close modal
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}
