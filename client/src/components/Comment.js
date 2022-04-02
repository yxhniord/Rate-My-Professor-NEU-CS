import React from 'react';
import {Card} from "react-bootstrap";
import moment from "moment";
import "../styles/Comment.css";

function Comment(props) {
    const comment = {
        course: "CS5610",
        campus: "Vancouver",
        rate: 5,
        date: Date.now(),
        content: "Descriptions: The household registration is also integral to the state’s control capacity. It splits the population into subcategories, divides the working population, and prevents both urban-rural and broad working-class solidarity.",
        professorName: "Neda"
    };
    return (
        <Card className="mb-3 comment-item">
            <Card.Header>{comment.professorName}</Card.Header>
            <Card.Body>
                <Card.Title>
                    {comment.course} &nbsp;&nbsp;
                    {moment(comment.date).format('MMM Do YYYY')}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Campus: {comment.campus} |  Grade: {comment.rate}</Card.Subtitle>
                <Card.Text>{comment.content}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Comment;