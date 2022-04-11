import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import "../styles/NewComment.css";
import {fetchProfessorById} from "../function/Api";

function NewComment() {
    const baseURL = process.env.REACT_APP_BACKEND_URL;
    const {profId, commentId} = useParams();
    const baseUrl = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
    const [professor, setProfessor] = useState({});
    const [newRating, setNewRating] = useState();
    const [newCourse, setNewCourse] = useState("");
    const [newCampus, setNewCampus] = useState("");
    const [newComment, setNewComment] = useState("");

    // Get professor details and comments
    useEffect(() => {
        fetchProfessorById(baseUrl, profId)
            .then((data) => {
                setProfessor(data);
            })
            .catch((error) => {
            console.log(error);
            navigate("/error");
        });

    }, []);

    const handleSubmit = () => {
        const newDate = new Date();
        // TODO: extract user id from local storage
        const createdNewComment = {
            course: newCourse,
            campus: newCampus,
            rate: newRating,
            date: newDate,
            content: newComment,
            // user: ,
            professor: profId,
        };

        fetch(`${baseURL}/comment/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(createdNewComment)
        }).then(() => {
            navigate(`/details/${profId}`);
        }).catch((error) => {
            console.log(error);
            navigate("/error");
        });
    };

    return (
        <div>

            <main>
                <Card className="new-comment-area">
                    <Card.Header className="new-comment-title" as="h3">
                        Create A New Comment
                    </Card.Header>
                    <Card.Body>
                        <Form className="new-comment-input">
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                                <Col sm="2">
                                    For
                                </Col>
                                <Col sm="10">
                                    <strong>{professor.first_name} {professor.last_name}</strong>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                                <Form.Label column sm="2">
                                    Rating
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control placeholder="__ out of 5" autoComplete="off" value={
                                        newRating
                                    } onChange={(e) => {
                                        setNewRating(e.target.value)
                                    }}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                                <Form.Label column sm="2">
                                    Course
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control placeholder="CS-XXXX" autoComplete="off" value={
                                        newCourse
                                    } onChange={(e) => {
                                        setNewCourse(e.target.value)
                                    }}/>
                                </Col>
                                <Form.Label column sm="2">
                                    at
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control placeholder="Campus name" autoComplete="off" value={
                                        newCampus
                                    } onChange={(e) => {
                                        setNewCampus(e.target.value)
                                    }}/>
                                </Col>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Enter your comments here</Form.Label>
                                <Form.Control as="textarea" rows={5} autoComplete="off" value={
                                    newComment
                                } onChange={(e) => {
                                    setNewComment(e.target.value)
                                }}/>
                            </Form.Group>

                            <br/>
                            <Button variant="dark" type="submit" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </main>

        </div>

    );
}

export default NewComment;