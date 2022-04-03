import React from "react";
import Comment from "./Comment";
import "../styles/CommentList.css";

function CommentList({comments}) {
    // if (comments.length === 0) {
    //     return <h2>No comments!</h2>
    // }
    return (
        <div className="comment-list">
            {Array.from({length: 4}).map((_, idx) =>
                <Comment key={{idx}} idx={idx}/>
            )}
        </div>
    )
}

export default CommentList;
