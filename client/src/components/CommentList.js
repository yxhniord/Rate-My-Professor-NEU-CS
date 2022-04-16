import Comment from "./Comment";
import "../styles/CommentList.css";

function CommentList({comments, deleteComment}) {
    return (
        <>
            {comments.length === 0 ?
                <h2>No Ratings!</h2> :
                <div className="comment-list">
                    {comments.map((comment) => <Comment key={comment._id} comment={comment}
                                                        deleteComment={deleteComment}/>)}
                </div>
            }
        </>
    )
}

export default CommentList;
