import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

function About({youtubeLoading, videoMetaInfo}) {
    return (
        <section id="about">
            <Container fluid className="about-container">
                <Row>
                    <Col as={Container} xs={12} md={6} className="neu-video">
                        {youtubeLoading || videoMetaInfo == null ?
                            <iframe src={`https://www.youtube.com/embed/HwBcOli0YLM`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen/> :
                            <iframe src={`https://www.youtube.com/embed/${videoMetaInfo.id.videoId}`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen/>
                        }
                    </Col>
                    <Col as={Container} xs={12} md={6} className="neu-description">
                        <a href="https://www.northeastern.edu/experience/" target="_blank">
                            <h1>Northeastern University</h1>
                        </a>
                        <h2>Experience is at the core of all we do.</h2>
                        <p>It’s what you gain when you
                            make the world your classroom, your laboratory, and your platform to create change
                            or grow your enterprise. To find ways of doing things differently, and better. And
                            to
                            seize opportunities as they unfold—anytime, anywhere.</p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default About;