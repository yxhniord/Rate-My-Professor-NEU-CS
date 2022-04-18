import React, {useEffect, useState} from 'react';
import "../styles/RatingDetails.css";
import {Button, Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChalkboardTeacher} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import {fetchCommentsByProfessorId, fetchProfessorById} from "../function/Api";

function RatingDetails() {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const {profId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [professor, setProfessor] = useState({});
    const [comments, setComments] = useState([]);
    const [rating, setRating] = useState(0);

    // Get professor details and comments
    useEffect(() => {
        fetchProfessorById(baseURL, profId)
            .then((data) => {
                setProfessor(data);
            })
            .catch((error) => {
                console.log(error);
                navigate("/error");
            });

        fetchCommentsByProfessorId(baseURL, profId)
            .then((data) => {
                setComments(data);

                if (data.length > 0) {
                    let sum = 0;
                    for (let comment of data) {
                        sum += comment.rate;
                    }
                    setRating(Math.round(sum / data.length));
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                navigate("/error");
            });
    }, [location.key]);

    return (
        <div>

            {loading ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> :
                <main>
                    <section>
                        <Container fluid>
                            <Row className="prof-detail">
                                <Col className="prof-description">
                                    {/*<div className="prof-title">*/}
                                    <FontAwesomeIcon className="prof-icon" icon={faChalkboardTeacher}/>
                                    <h3>
                                        {professor.first_name}{" "}{professor.last_name}
                                    </h3>
                                    {/*</div>*/}
                                </Col>
                                <Col className="prof-rating">
                                    <h3>
                                        {professor.rate} / 5
                                    </h3>
                                    <Button className="add-rating" variant="dark"
                                            onClick={() => navigate(`/newComment/${profId}`)}>
                                        Add Comment
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <section className="comment-detail">
                        <Row lg={1} className="g-4 comment-items">
                            {comments.map((comment) => (
                                <Col key={comment._id}>
                                    <Card className="comment-item">
                                        <Card.Body className="comment-item-rating">
                                            <Card.Text as="h4">{comment.rate} / 5</Card.Text>
                                        </Card.Body>
                                        <Card.Body className={"comment-item-content"}>
                                            <Card.Title as={"h6"}>{comment.course}</Card.Title>
                                            <Card.Text as="p">
                                                From {comment.campus} campus: {comment.content}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </section>
                </main>
            }
        </div>
    );
}

export default RatingDetails;