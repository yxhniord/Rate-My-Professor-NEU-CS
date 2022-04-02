import React from 'react';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import {Card, Col, Row} from "react-bootstrap";
import "../styles/SearchResults.css";

function SearchResults(props) {
    return (
        <div>
            <Navigation/>

            <main>
                {/*TODO: map queried results*/}
                {/*TODO: add pagination if have time*/}
                <Row lg={1} className="g-4 search-results">

                    <h1>Search Results ...</h1>

                    {Array.from({length: 4}).map((_, idx) => (
                        <Col key={idx}>
                            <Card className="search-result">
                                <Card.Body className="search-result-rating">
                                    <Card.Text as="h2">{idx}</Card.Text>
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

            <Footer/>
        </div>
    );
}

export default SearchResults;