import React from 'react';
import {Carousel, Spinner} from "react-bootstrap";
import "../../styles/Home.css";

function Headline({loading, dbUser, comments, professors}) {
    return (
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
                            {professors.length > 0 && professors.slice(0, 5).map((professor) => {
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
    );
}

export default Headline;