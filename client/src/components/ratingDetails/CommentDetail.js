import React from 'react';
import {Card, Col} from "react-bootstrap";
import "../../styles/RatingDetails.css"

function CommentDetail({data}) {
    const comment = data;
    return (
        <Col key={comment._id}>
            <Card className="comment-item">
                <Card.Body className="comment-item-rating">
                    <Card.Text as="h4">{comment.rate} / 5</Card.Text>
                </Card.Body>
                <Card.Body className={"comment-item-content"}>
                    <Card.Title as={"h5"}>{comment.course}</Card.Title>
                    <Card.Text as="p">
                        From {comment.campus} campus: {comment.content}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default CommentDetail;