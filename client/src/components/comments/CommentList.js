import Comment from "./Comment";
import "../../styles/CommentList.css";
import ComponentPagination from "../ComponentPagination";

function CommentList({comments, deleteComment}) {
    console.log(comments.length)
    return (
        <div className="comment-list-area">
            {comments.length === 0 ?
                <h2>No Ratings!</h2> :
                <div className="comment-list">
                    <ComponentPagination data={comments} dataLimit={5} RenderComponent={Comment} fn={deleteComment}/>
                </div>
            }
        </div>
    )
}

export default CommentList;
