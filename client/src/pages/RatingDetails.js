import React, {useEffect, useState} from 'react';
import "../styles/RatingDetails.css";
import {Button, Card, Col, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChalkboardTeacher} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useParams} from "react-router-dom";
import {fetchCommentsByProfessorId, fetchProfessorById} from "../function/Api";

function RatingDetails() {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const {profId} = useParams();
    const navigate = useNavigate();
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
    }, []);

    return (
        <div>

            {loading ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> :
                <main>
                    <section className="prof-detail">
                        <div className="prof-description">
                            <div className="prof-title">
                                <FontAwesomeIcon className="prof-icon" icon={faChalkboardTeacher}/>
                                <h2>
                                    {professor.first_name}{" "}{professor.last_name}
                                </h2>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam,
                                aspernatur autem consequatur cumque doloremque dolores eaque eius
                                eligendi, eveniet fugiat harum illo illum ipsa ipsum iste itaque
                                laboriosam laudantium libero magni molestiae nam natus necessitatibus
                                neque nihil nobis non nostrum numquam odit officia omnis optio
                                pariatur perspiciatis porro quaerat quas quia quibusdam quidem quis
                                quod ratione repellat repudiandae rerum saepe sed sequi similique
                                sint soluta temporibus tenetur totam ullam unde, veritatis voluptas
                                voluptate voluptates.
                            </p>
                        </div>
                        <div className="prof-rating">
                            <h1>
                                {isNaN(rating) ? 0 : rating} / 5
                            </h1>
                            <Button className="add-rating" variant="dark"
                                    onClick={() => navigate(`/newComment/${profId}`)}>
                                Add Comment
                            </Button>
                        </div>
                    </section>

                    <section className="comment-detail">
                        <Row lg={1} className="g-4 comment-items">
                            {comments.map((comment) => (
                                <Col key={comment._id}>
                                    <Card className="comment-item">
                                        <Card.Body className="comment-item-rating">
                                            <Card.Text as="h3">{comment.rate} / 5</Card.Text>
                                        </Card.Body>
                                        <Card.Body className={"comment-item-content"}>
                                            <Card.Title as={"h4"}>{comment.course}</Card.Title>
                                            <Card.Text>
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