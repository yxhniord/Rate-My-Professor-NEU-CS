import React, {useEffect} from 'react';
import {Card} from "react-bootstrap";
import moment from "moment";
import "../styles/Comment.css";
import {useNavigate} from "react-router-dom";

function Comment({comment}) {
    const baseUrl = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
    const [professor, setProfessor] = React.useState(null);

    useEffect(() => {
        async function fetchProfessor() {
            const response = await fetch(`${baseUrl}/professor/id/${comment.professor}`);
            const professor = await response.json();
            setProfessor(professor);
        }

        fetchProfessor().catch((err) => {
            console.log(err);
            navigate("/error");
        });
    }, []);

    return (
        <Card className="mb-3">
            {professor != null &&
                <Card.Header>{professor.first_name} {professor.last_name}</Card.Header>
            }
            <Card.Body>
                <Card.Title>
                    {comment.course} &nbsp;&nbsp;
                    {moment(comment.date).format('MMM Do YYYY')}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Campus: {comment.campus} |
                    Grade: {comment.rate}</Card.Subtitle>
                <Card.Text>{comment.content}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Comment;