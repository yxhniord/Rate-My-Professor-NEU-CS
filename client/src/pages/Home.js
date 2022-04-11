import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Carousel, Figure, Form, FormControl, Placeholder, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import "../styles/Home.css";
import {useAuth0} from "@auth0/auth0-react";
import {fetchCommentsByUserId, fetchDbUser, fetchProfessorById} from "../function/Api";

function Home() {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [name, setName] = useState("");
    const {isAuthenticated, isLoading, user} = useAuth0();
    const [loading, setLoading] = useState(true);
    const [dbUser, setDbUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [professors, setProfessors] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {

        if (isAuthenticated) {
            // First get user from database if authenticated
            fetchDbUser(baseURL, user.sub)
                .then(dbUsers => {
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
                        })
                })
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
        <div>

            <main>
                <section id="search">
                    <Form className="search-area" onSubmit={handleSubmit}>
                        <FormControl className="search-box" aria-label="Type the name of your professor" value={name}
                                     onChange={(e) => setName(e.target.value)}/>
                        <Button variant="outline-dark" type="submit">
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
                            {/*TODO: Map top five professors*/}
                            {loading ?
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner> :
                                <>
                                    {comments.length > 0 && <Carousel className="headline-img">
                                        {comments.map((comment, index) => {
                                            return (
                                                <Carousel.Item key={comment._id} >
                                                    <img
                                                        className="d-block w-100"
                                                        src="https://media.istockphoto.com/photos/old-school-chalkboard-picture-id547016978?b=1&k=20&m=547016978&s=170667a&w=0&h=CFpK3c30n2dD059xLC0PxngaX1wMn2Aa5erw9M0ub3s="
                                                        alt="First slide"
                                                    />
                                                    <Carousel.Caption className="headline-caption" >
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
                    <Figure className="neu-video">
                        <Figure.Image
                            alt="neu video"
                            src="https://www.addictivetips.com/app/uploads/2018/12/YouTube-Screenshot-Button.jpg"
                        />
                        <Figure.Caption>
                            Nulla vitae elit libero, a pharetra augue mollis interdum.
                        </Figure.Caption>
                    </Figure>
                    <div className="neu-description">
                        <Placeholder xs={6}/>
                        <Placeholder className="w-75"/> <Placeholder style={{width: '25%'}}/>
                    </div>
                </section>
            </main>

        </div>
    );
}

export default Home;