import React from "react";
import Comment from "./Comment";
import "../styles/CommentList.css";

function CommentList({comments}) {
    if (comments.length === 0) {
        return <h2>No comments!</h2>
    }
    return (
        <div className="comment-list">
            {comments.map((comment)=>
                <Comment comment={comment} />
            )}
        </div>
    )
}

export default CommentList;
