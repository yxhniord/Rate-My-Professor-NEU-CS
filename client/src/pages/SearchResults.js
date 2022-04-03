import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import {Card, Col, Row, Spinner} from "react-bootstrap";
import "../styles/SearchResults.css";

function SearchResults() {
    const baseURL = process.env.REACT_APP_BACKEND_URL;

    // GET/professor/name/:name
    const {name} = useParams();
    const navigate = useNavigate();
    const [professors, setProfessors] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    fetch(`${baseURL}/professor/name/${name}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((response) => response.json()).then((data) => {
        setProfessors(data);
        setLoading(false);
    }).catch((error) => {
        console.log(error);
        navigate("/error");
    });

    return (
        <div>
            <Navigation/>
            {loading ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> :
                <main>
                    {/*TODO: add pagination if have time*/}
                    <Row lg={1} className="g-4 search-results">
                        <h1>Search Results ...</h1>

                        professors.length === 0 ?
                        <h2>No results found</h2> :
                        {professors.map((_, idx) => (
                            <Col key={idx}>
                                <Card className="search-result">
                                    <Card.Body className="search-result-rating">
                                        <Card.Text as="h2">{idx} / 5</Card.Text>
                                    </Card.Body>
                                    <Card.Body className={"search-result-content"}>
                                        <Card.Title>{`Neda ${idx}`}</Card.Title>
                                        <Card.Text>
                                            {"Descriptions: The household registration is also integral to the state’s control capacity. It splits the population into subcategories, divides the working population, and prevents both urban-rural and broad working-class solidarity."}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </main>
            }

            <Footer/>
        </div>
    );
}

export default SearchResults;