import { useEffect, useState } from "react"
import axios from "axios"
import { baseURL } from "../utils/urls";

interface iPostId {
    id:number
}

export default function Comments (props:iPostId):JSX.Element{
    const [allComments, setAllComments] = useState([])
    const [newComment, setNewComment] = useState<string>("")
    const [toggle, setToggle] = useState<boolean>(false)


    async function getAllComments(){
        setToggle((prev) => !prev)
        const result = await axios.get(baseURL+"comments"+"/" + props.id)
        setAllComments(result.data)
        console.log(allComments)
    }
   


    return(
        <>
        <button onClick={() => getAllComments() }>View all comments</button>
        {toggle && <div>
            <input placeholder="Input comment here..."></input>
            <button>Add Comment</button>
            </div>}
        </>
    )
}