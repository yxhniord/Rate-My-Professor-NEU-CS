import React, {useEffect} from "react";
import Comment from "./Comment";
import "../styles/CommentList.css";
import {useNavigate} from "react-router-dom";

function CommentList({userId}) {
    const baseUrl = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
    const [comments, setComments] = React.useState([]);

    useEffect(() => {
        async function fetchComments() {
            const response = await fetch(`${baseUrl}/comment/user/${userId}`);
            const data = await response.json();
            setComments(data);
        }

        fetchComments().catch((err) => {
            console.log(err);
            navigate("/error");
        });
    }, [comments.length]);

    return (
        <>
            {comments.length === 0 ?
                <h2>No Ratings!</h2> :
                <div className="comment-list">
                    {comments.map((comment) => <Comment key={comment._id} comment={comment}/>)}
                </div>
            }
        </>
    )
}

export default CommentList;
