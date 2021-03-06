import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Alert, Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import "../styles/NewComment.css";
import {createComment, fetchCommentById, fetchProfessorById, updateComment} from "../function/Api";
import {useAuth0} from "@auth0/auth0-react";
import {useSelector} from "react-redux";

function NewComment() {
    const navigate = useNavigate();
    const {profId, commentId} = useParams();
    const {isLoading, getAccessTokenSilently} = useAuth0();

    // Get user information from Redux store
    const dbUser = useSelector(state => state.user.user);
    const userLoading = useSelector(state => state.user.loading);

    const [loading, setLoading] = useState(true);
    const [professor, setProfessor] = useState({});
    const [newRating, setNewRating] = useState("");
    const [newCourse, setNewCourse] = useState("");
    const [newCampus, setNewCampus] = useState("");
    const [newComment, setNewComment] = useState("");
    const [wrongInputMessage, setWrongInputMessage] = useState([]);
    let profIdFromComment;
    let isMounted = true;

    async function fetchData() {
        // If update comment from updateComment/:commentId
        // Set all fields according to data provided by comment id
        // If auth0_id is not the same as the logged-in user, redirect to error-page
        if (commentId !== undefined) {
            fetchCommentById(commentId)
                .then((data) => {
                    if (isMounted) {
                        setNewCourse(data.course);
                        setNewCampus(data.campus);
                        setNewRating(data.rate);
                        setNewComment(data.content);
                        profIdFromComment = data.professor;
                    }
                })
                .then(() => {
                    if (profIdFromComment === undefined) return;
                    fetchProfessorById(profIdFromComment)
                        .then((data) => {
                            if (isMounted) {
                                setProfessor(data);
                                setLoading(false);
                            }
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
            fetchProfessorById(profId)
                .then((data) => {
                    if (isMounted) {
                        setProfessor(data);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    navigate("/error");
                });
        }
    }

    useEffect(() => {
        if (!isLoading && !userLoading && dbUser) {
            fetchData()
                .catch((error) => {
                    console.log(`error from fetching user from database: ${error}`);
                    navigate("/error");
                });
        }

        return () => {
            isMounted = false;
        }
    }, [isLoading, userLoading, dbUser]);

    // Called when the submit button is clicked
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Reset error message everytime submit button is clicked
        setWrongInputMessage([]);

        // New comment JSON object
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
        const token = await getAccessTokenSilently();
        // In case of updating a comment
        if (commentId !== undefined) {

            updateComment(commentId, createdNewComment, token)
                .then((response) => {
                    // Check if inputs are valid
                    if (response) {
                        let array = []
                        for (let m of response.message) {
                            array.push(m.msg);
                        }
                        setWrongInputMessage(array);
                    } else {
                        navigate(`/profile/user-comments`);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    navigate("/error");
                });
            //    In case of creating new comment
        } else if (profId !== undefined) {
            createComment(createdNewComment, token)
                .then((response) => {
                    // Check if inputs are valid
                    if (response) {
                        let array = []
                        for (let m of response.message) {
                            array.push(m.msg);
                        }
                        setWrongInputMessage(array);
                    } else {
                        navigate(`/details/${professor._id}`);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    navigate("/error");
                });
        }
    };

    return (
        <div>

            <main>
                {loading ?
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner> :
                    <>
                        {wrongInputMessage.length > 0 &&
                            <Alert className="wrong-input-alert" variant="danger" dismissible>
                                <Alert.Heading>Some required fields are missing!</Alert.Heading>
                                {wrongInputMessage.map((errMessage, index) => <p
                                    key={index}>{index + 1}: {errMessage}</p>)}
                            </Alert>
                        }
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
                                        <Form.Label column md="2">
                                            Rating*
                                        </Form.Label>
                                        <Col md="10">
                                            <Form.Control placeholder="__ out of 5" autoComplete="off" value={
                                                newRating
                                            } onChange={(e) => {
                                                setNewRating(e.target.value)
                                            }}/>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                                        <Form.Label column md="2">
                                            Course*
                                        </Form.Label>
                                        <Col md="4">
                                            <Form.Control placeholder="CS-XXXX" autoComplete="off" value={
                                                newCourse
                                            } onChange={(e) => {
                                                setNewCourse(e.target.value)
                                            }}/>
                                        </Col>
                                        <Form.Label column sm="2">
                                            at*
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Select aria-label="Default select example"
                                                         onChange={e => setNewCampus(e.target.value)}>
                                                <option>Select your campus</option>
                                                <option value="Vancouver">Vancouver</option>
                                                <option value="Seattle">Seattle</option>
                                                <option value="Boston">Boston</option>
                                            </Form.Select>
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

                                    <p>Fields with * are required</p>

                                    <br/>
                                    <Button className="mb-3" variant="dark" type="submit" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </>
                }

            </main>

        </div>

    );
}

export default NewComment;