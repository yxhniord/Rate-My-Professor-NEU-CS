import React from 'react';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "../styles/RatingDetails.css";
import {Card, Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChalkboardTeacher} from "@fortawesome/free-solid-svg-icons";

function RatingDetails(props) {
    return (
        <div>
            <Navigation/>

            <main>
                <section className="prof-detail">
                    <div className="prof-description">
                        <div className="prof-title">
                            <FontAwesomeIcon className="prof-icon" icon={faChalkboardTeacher}/>
                            <h2>
                                {"Neda"}
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
                    <h1 className="prof-rating">
                        5 / 5
                    </h1>
                </section>

                <section className="comment-detail">
                    <Row lg={1} className="g-4 comment-items">
                        {Array.from({length: 4}).map((_, idx) => (
                            <Col key={idx}>
                                <Card className="comment-item">
                                    <Card.Body className="comment-item-rating">
                                        <Card.Text as="h3">{idx} / 5</Card.Text>
                                    </Card.Body>
                                    <Card.Body className={"comment-item-content"}>
                                        <Card.Title>{`CS 000${idx}`}</Card.Title>
                                        <Card.Text>
                                            {"Comments: The household registration is also integral to the state’s control capacity. It splits the population into subcategories, divides the working population, and prevents both urban-rural and broad working-class solidarity."}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>
            </main>

            <Footer/>
        </div>
    );
}

export default RatingDetails;