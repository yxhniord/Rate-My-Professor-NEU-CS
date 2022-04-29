import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChalkboardTeacher} from "@fortawesome/free-solid-svg-icons";
import "../../styles/RatingDetails.css";
import {useNavigate} from "react-router-dom";

function ProfDescription(props) {
    const professor = props.professor;
    const comments = props.comments;
    const navigate = useNavigate();
    return (
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
                            {comments.length === 0 ? "-" : professor.rate} / 5
                        </h3>
                        <Button className="add-rating" variant="dark"
                                onClick={() => navigate(`/newComment/${professor._id}`)}>
                            Add Comment
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default ProfDescription;