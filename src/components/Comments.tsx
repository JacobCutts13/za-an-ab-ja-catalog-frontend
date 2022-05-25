import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/urls";

interface iPostId {
  id: number;
  user: number;
}

interface iComment {
  name: string;
  comment: string;
  comment_id: number;
}

export default function Comments(props: iPostId): JSX.Element {
  const [allComments, setAllComments] = useState<iComment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [showCommentstoggle, setshowCommentsToggle] = useState<boolean>(false);
  const [submitToggle, setSubmitToggle] = useState<boolean>(false);
  const [deleteToggle, setDeleteToggle] = useState<boolean>(false);

  useEffect(() => {
    async function getAllComments() {
      const result = await axios.get(baseURL + "comments" + "/" + props.id);
      setAllComments(result.data);
    }
    getAllComments();
  }, [submitToggle, deleteToggle]);

  async function submitComment() {
    setSubmitToggle((prev) => !prev);
    if (newComment === "") {
      window.alert("Please input a comment to post.");
    } else {
      await axios.post(baseURL + "comments", {
        userid: props.user,
        postid: props.id,
        comment: newComment,
      });
      setNewComment("");
    }
  }

  async function handleDeleteComment() {
    setDeleteToggle((prev) => !prev);
    await axios.delete(baseURL + "comments/" + allComments[0].comment_id);
  }

  return (
    <>
      {props.user !== -1 && (
        <button onClick={() => setshowCommentsToggle((prev) => !prev)}>
          View all comments
        </button>
      )}
      {showCommentstoggle && (
        <div>
          <input
            placeholder="Input comment here..."
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></input>
          <button onClick={() => submitComment()}>Add Comment</button>
          {allComments.map((post, idx) => (
            <div key={idx}>
              {post.name}: {post.comment}
              <button onClick={() => handleDeleteComment()}>delete</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
