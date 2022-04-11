import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import "../styles/NewComment.css";
import {fetchCommentById, fetchDbUser, fetchProfessorById} from "../function/Api";
import {useAuth0} from "@auth0/auth0-react";

function NewComment() {
    const baseURL = process.env.REACT_APP_BACKEND_URL;
    const {profId, commentId} = useParams();
    const navigate = useNavigate();
    const {user} = useAuth0();
    const [professor, setProfessor] = useState({});
    const [newRating, setNewRating] = useState();
    const [newCourse, setNewCourse] = useState("");
    const [newCampus, setNewCampus] = useState("");
    const [newComment, setNewComment] = useState("");
    const [dbUser, setDbUser] = useState({});
    let profIdFromComment;

    useEffect(() => {
        // fetch dbUser
        fetchDbUser(baseURL, user.sub)
            .then((data) => {
                setDbUser(data[0]);
            })
            .catch((error) => {
                console.log(`error from fetching user from database: ${error}`);
                navigate("/error");
            });

        // If update comment from updateComment/:commentId
        // Set all fields according to data provided by comment id
        // If auth0_id is not the same as the logged-in user, redirect to error-page
        if (commentId !== undefined) {
            fetchCommentById(baseURL, commentId)
                .then((data) => {
                    // const userIdFromComment = data.user;

                    setNewCourse(data.course);
                    setNewCampus(data.campus);
                    setNewRating(data.rate);
                    setNewComment(data.content);
                    profIdFromComment=data.professor;
                })
                .then(() => {
                    fetchProfessorById(baseURL, profIdFromComment)
                        .then((data) => {
                            setProfessor(data);
                            console.log(data);
                        })
                        .catch((error) => {
                            console.log(error);
                            navigate("/error");
                        });
                })
                .catch((error) => {
                    console.log(error);
                    navigate("/error");
                });
        }

        // If new comment from professor/:profId
        // Set only fields related to professor, others remain blank
        else if (profId !== undefined) {
            fetchProfessorById(baseURL, profId)
                .then((data) => {
                    setProfessor(data);
                })
                .catch((error) => {
                    console.log(error);
                    navigate("/error");
                });
        }

    }, []);

    // Called when the submit button is clicked
    const handleSubmit = (e) => {
        e.preventDefault();
        const newDate = new Date();

        const createdNewComment = {
            course: newCourse,
            campus: newCampus,
            rate: newRating,
            date: newDate,
            content: newComment,
            user: dbUser._id,
            professor: professor._id,
        };

        console.log(createdNewComment);

        if (commentId !== undefined) {
            fetch(`${baseURL}/comment/update/${commentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(createdNewComment)
            }).then(() => {
                navigate(`/details/${professor._id}`);
            }).catch((error) => {
                console.log(error);
                navigate("/error");
            });
        }

        else if (profId !== undefined) {
            fetch(`${baseURL}/comment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(createdNewComment)
            }).then(() => {
                navigate(`/details/${professor._id}`);
            }).catch((error) => {
                console.log(error);
                navigate("/error");
            });
        }
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