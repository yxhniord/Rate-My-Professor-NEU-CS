import {useEffect, useState} from "react";
import Comment from "./Comment";
import "../styles/CommentList.css";
import {useNavigate} from "react-router-dom";
import {fetchCommentsByUserId} from "../function/Api";

function CommentList({userId}) {
    const baseURL = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // async function fetchComments() {
        //     const response = await fetch(`${baseUrl}/comment/user/${userId}`);
        //     const data = await response.json();
        //     setComments(data);
        // }

        fetchCommentsByUserId(baseURL, userId)
            .then(data => {
                setComments(data);
            })
            .catch((err) => {
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
