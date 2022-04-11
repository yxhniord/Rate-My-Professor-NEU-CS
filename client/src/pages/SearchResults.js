import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Card, Col, Row, Spinner} from "react-bootstrap";
import "../styles/SearchResults.css";
import {fetchProfessorsByName} from "../function/Api";

function SearchResults() {
    const baseUrl = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
    const {name} = useParams();
    const [loading, setLoading] = useState(true);
    const [professors, setProfessors] = useState([]);

    // GET/professor/name/:name
    useEffect(() => {

        fetchProfessorsByName(baseUrl, name)
            .then((data) => {
                setProfessors(data);
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
                    {/*TODO: add pagination if have time*/}
                    <Row lg={1} className="g-4 search-results">
                        <h1>Are you looking for ...</h1>

                        {professors.length === 0 ?
                            <h3>No results found</h3> :
                            <>
                                {professors.map((professor) => (
                                    <Col key={professor._id}>
                                        <Card className="search-result">

                                            <Card.Body className="search-result-rating">
                                                <Link to={`/details/${professor._id}`}
                                                      style={{color: 'inherit', textDecoration: 'inherit'}}>

                                                    <Card.Title
                                                        as="h2">{professor.first_name}{" "}{professor.last_name}
                                                    </Card.Title>
                                                </Link>
                                            </Card.Body>
                                            <Card.Body className={"search-result-content"}>
                                                <Card.Title>Top comment</Card.Title>
                                                <Card.Text>
                                                    {professor.comment.length} {professor.comment.length > 1? " students" : " student"} commented on this professor.
                                                </Card.Text>
                                            </Card.Body>

                                        </Card>
                                    </Col>
                                ))}
                            </>}
                    </Row>
                </main>
            }

        </div>
    );
}

export default SearchResults;