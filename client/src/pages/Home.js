import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Carousel, Col, Container, Form, FormControl, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "../styles/Home.css";
import {useAuth0} from "@auth0/auth0-react";
import {fetchCommentsByUserId, fetchDbUser, fetchProfessorById, fetchTopRateProfessors} from "../function/Api";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../actions/userActions";

function Home() {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const youtubeAPI = process.env.REACT_APP_YOUTUBE_API;
    const youtubeAPIKey = process.env.REACT_APP_YOUTUBE_API_KEY;
    const [name, setName] = useState("");
    const {isAuthenticated, isLoading, user, getAccessTokenSilently} = useAuth0();
    const [loading, setLoading] = useState(true);
    const [youtubeLoading, setYoutubeLoading] = useState(true);
    const [videoMetaInfo, setVideoMetaInfo] = useState(null);
    const dbUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    // const [dbUser, setDbUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [professors, setProfessors] = useState([]);
    const navigate = useNavigate();

    async function getYouTubePlaylistItems() {
        const res = await fetch(`${youtubeAPI}/search?part=snippet&type=video&q=northeastern+university&maxResults=5&key=${youtubeAPIKey}`);
        return await res.json();
    }

    useEffect(() => {
        getYouTubePlaylistItems()
            .then((res) => {
                if (res?.error) {
                    return;
                }
                const index = Math.floor(Math.random() * res.items.length);
                setVideoMetaInfo(res.items[index]);
                setYoutubeLoading(false);
            })
            .catch(err => {
                console.log(err);
            });

        async function getComments() {
            const token = await getAccessTokenSilently();
            fetchCommentsByUserId(baseURL, dbUser._id, token)
                .then(comments => {
                    setComments(comments);
                    setProfessors([]);

                    // For each comment, get professors from database and store in an array
                    for (let comment of comments) {
                        fetchProfessorById(baseURL, comment.professor)
                            .then(professor => {
                                setProfessors(professors => [...professors, professor]);
                            })
                    }
                    setLoading(false);
                })
        }

        if (dbUser) {
            getComments()
                .catch((err) => {
                    console.log(err);
                    navigate("/error");
                });
        } else {
            fetchTopRateProfessors(baseURL)
                .then(data => {
                    setProfessors(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    navigate("/error");
                });
        }
    }, [youtubeLoading, dbUser]);


    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search/${name}`, {replace: true});
        setName("");
    };

    return (

        <main>
            <section id="search">
                <Form className="search-area" onSubmit={handleSubmit}>
                    <FormControl className="search-box" placeholder="Type professor's name" size="lg" value={name}
                                 onChange={(e) => setName(e.target.value)}/>
                    <Button variant="dark" type="submit" size="lg" aria-label="search">
                        <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass}/>
                    </Button>
                </Form>
            </section>

            <section id="headline">
                {/* regardless whether isAuthenticated, need to fetch data */}
                {loading ?
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner> :


                    <>
                        {/* If authenticated, display user comments*/}
                        {/* If not authenticated, display a list of professors with highest ratings*/}
                        {dbUser ?
                            // Is authenticated
                            <Carousel className="headline-img">
                                {/* Display a message if no user comments are found */}
                                {comments.length === 0 && <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="https://media.istockphoto.com/photos/old-school-chalkboard-picture-id547016978?b=1&k=20&m=547016978&s=170667a&w=0&h=CFpK3c30n2dD059xLC0PxngaX1wMn2Aa5erw9M0ub3s="
                                        alt="Carousel background image"
                                    />
                                    <Carousel.Caption className="headline-caption">
                                        <h1>No comments created.</h1>
                                    </Carousel.Caption>
                                </Carousel.Item>}
                                {/* Display top five comments if there are user created comments */}
                                {comments.slice(0, 5).map((comment, index) => {
                                    return (
                                        <Carousel.Item key={comment._id}>
                                            <img
                                                className="d-block w-100"
                                                src="https://media.istockphoto.com/photos/old-school-chalkboard-picture-id547016978?b=1&k=20&m=547016978&s=170667a&w=0&h=CFpK3c30n2dD059xLC0PxngaX1wMn2Aa5erw9M0ub3s="
                                                alt="Carousel background image"
                                            />
                                            <Carousel.Caption className="headline-caption">
                                                <h1>{professors[index]?.first_name} {professors[index]?.last_name}</h1>
                                                {comment.course && <p>Course: {comment.course}</p>}
                                                {comment.rate && <p>Rating: {comment.rate}</p>}
                                                {comment.content &&
                                                    <p className="headline-prof-comment">Comment: {comment.content}</p>}
                                            </Carousel.Caption>
                                        </Carousel.Item>)
                                })}
                            </Carousel> :
                            // Not authenticated
                            <Carousel className="headline-img">
                                {professors.length > 0 && professors.slice(0, 5).map((professor, index) => {
                                    return (
                                        <Carousel.Item key={professor._id}>
                                            <img
                                                className="d-block w-100"
                                                src="https://media.istockphoto.com/photos/old-school-chalkboard-picture-id547016978?b=1&k=20&m=547016978&s=170667a&w=0&h=CFpK3c30n2dD059xLC0PxngaX1wMn2Aa5erw9M0ub3s="
                                                alt="Carousel background image"
                                            />
                                            <Carousel.Caption className="headline-caption">
                                                <h1>{professor.first_name} {professor.last_name}</h1>
                                                {professor.rate && <p>Rating: {professor.rate}</p>}
                                            </Carousel.Caption>
                                        </Carousel.Item>)
                                })}

                            </Carousel>}
                    </>

                }
            </section>

            <section id="about">
                <Container fluid className="about-container">
                    <Row>
                        <Col as={Container} xs={12} md={6} className="neu-video">
                            {youtubeLoading || videoMetaInfo == null ?
                                <iframe src={`https://www.youtube.com/embed/HwBcOli0YLM`}
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen/> :
                                <iframe src={`https://www.youtube.com/embed/${videoMetaInfo.id.videoId}`}
                                        title="YouTube video player" frameBorder="0"
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
        </main>
    );
}

export default Home;