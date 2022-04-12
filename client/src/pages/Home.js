import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Carousel, Col, Container, Form, FormControl, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "../styles/Home.css";
import {useAuth0} from "@auth0/auth0-react";
import {fetchCommentsByUserId, fetchDbUser, fetchProfessorById} from "../function/Api";

function Home() {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [name, setName] = useState("");
    const {isAuthenticated, isLoading, user, getAccessTokenSilently} = useAuth0();
    const [loading, setLoading] = useState(true);
    const [dbUser, setDbUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [professors, setProfessors] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchData() {
            // First get user from database if authenticated
            const token = await getAccessTokenSilently();
            fetchDbUser(baseURL, user.sub, token)
                .then(dbUsers => {
                    if (dbUsers.length === 0) {
                        navigate("/userInfoForm");
                    } else {
                        setDbUser(dbUsers[0]);

                        // Then get comments from database based on user id
                        fetchCommentsByUserId(baseURL, dbUsers[0]._id)
                            .then(comments => {
                                setComments(comments);

                                // For each comment, get professors from database and store in an array
                                for (let comment of comments) {
                                    fetchProfessorById(baseURL, comment.professor)
                                        .then(professor => {
                                            setProfessors(professors => [...professors, professor]);
                                        })
                                }
                                setLoading(false);
                            });
                    }
                })
        }

        if (isAuthenticated) {
            fetchData()
                .catch((err) => {
                    console.log(err);
                    navigate("/error");
                });
        }
    }, [isLoading, isAuthenticated]);


    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search/${name}`, {replace: true});
        setName("");
    };

    return (

        <main>
            <section id="search">
                <Form className="search-area" onSubmit={handleSubmit}>
                    <FormControl className="search-box" placeholder="Type the name of your professor" size="lg" value={name}
                                 onChange={(e) => setName(e.target.value)}/>
                    <Button variant="dark" type="submit" size="lg">
                        <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass}/>
                    </Button>
                </Form>
            </section>

            {isLoading ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> :
                <>
                    {isAuthenticated && <section id="headline">
                        {loading ?
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> :
                            <>
                                {comments.length > 0 && <Carousel className="headline-img">
                                    {comments.map((comment, index) => {
                                        return (
                                            <Carousel.Item key={comment._id}>
                                                <img
                                                    className="d-block w-100"
                                                    src="https://media.istockphoto.com/photos/old-school-chalkboard-picture-id547016978?b=1&k=20&m=547016978&s=170667a&w=0&h=CFpK3c30n2dD059xLC0PxngaX1wMn2Aa5erw9M0ub3s="
                                                    alt="Carousel background image"
                                                />
                                                <Carousel.Caption className="headline-caption">
                                                    <h3>{professors[index]?.first_name} {professors[index]?.last_name}</h3>
                                                    <br/>
                                                    <p>{comment.course && `Course: ${comment.course}`}</p>
                                                    <p>{comment.rate && `Rating: ${comment.rate}`}</p>
                                                    <p>{comment.content && `Comment: ${comment.content}`}</p>
                                                </Carousel.Caption>
                                            </Carousel.Item>)
                                    })}
                                </Carousel>}
                            </>
                        }
                    </section>}
                </>
            }

            <section id="about">
                <Container fluid className="about-container">
                    <Row>
                        <Col as={Container} xs={12} md={6} className="neu-video">
                            <iframe src="https://www.youtube.com/embed/HwBcOli0YLM"
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen/>
                        </Col>
                        <Col as={Container} xs={12} md={6} className="neu-description">
                            <a href="https://www.northeastern.edu/experience/" target="_blank">
                                <h3>Northeastern University</h3>
                            </a>
                            <h6>Experience is at the core of all we do.</h6>
                            <p>It’s what you gain when you
                                make the world your classroom, your laboratory, and your platform to create change
                                or grow your enterprise. To find ways of doing things differently, and better. And to
                                seize opportunities as they unfold—anytime, anywhere.</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
}

export default Home;