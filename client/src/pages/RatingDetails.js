import React, {useEffect, useState} from 'react';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "../styles/RatingDetails.css";
import {Button, Card, Col, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChalkboardTeacher} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, useParams} from "react-router-dom";

function RatingDetails(props) {
    const baseURL = process.env.REACT_APP_BACKEND_URL;
    const {profId} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [professor, setProfessor] = useState({});
    const [comments, setComments] = useState([]);
    const [rating, setRating] = useState(0);

    // Get professor details and comments
    useEffect(() => {
        async function fetchProfessor() {
            const response = await fetch(`${baseURL}/professor/id/${profId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            setProfessor(data);
        }

        async function fetchComments() {
            const response = await fetch(`${baseURL}/comment/professor/${profId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            setComments(data);
            setLoading(false);
        }

        fetchProfessor().catch((error) => {
            console.log(error);
            navigate("/error");
        });

        fetchComments().catch((error) => {
            console.log(error);
            navigate("/error");
        });

        let sum = 0;
        for (let i = 0; i < comments.length; i++) {
            sum += Number(comments[i].rate);
        }
        setRating(Math.round(sum / comments.length));

    }, []);

    return (
        <div>
            <Navigation/>

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
                        <div>
                        <h1 className="prof-rating">
                            {rating} / 5
                        </h1>
                            <Button className="add-rating" variant="dark" onClick={() => navigate(`/newComment/${profId}`)}>
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
            <Footer/>
        </div>
    );
}

export default RatingDetails;