import React from 'react';
import {Card, Col, Row} from "react-bootstrap";

function CommentDetail(props) {
    const comments = props.comments;

    return (
        <section className="comment-detail">
            <Row lg={1} className="g-4 comment-items">
                {comments.map((comment) => (
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
                ))}
            </Row>
        </section>
    );
}

export default CommentDetail;