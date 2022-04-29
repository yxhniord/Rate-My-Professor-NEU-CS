import React from 'react';
import {Card, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../../styles/SearchResults.css";

function SearchResult({data}) {
    const professor = data;
    return (
        <Col>
            <Card className="search-result">

                <Card.Body className="search-result-rating">
                    <Link role="button" to={`/details/${professor._id}`}
                          style={{color: 'inherit', textDecoration: 'inherit'}}>

                        <Card.Title
                            as="h4">{professor.first_name}{" "}{professor.last_name}
                        </Card.Title>
                    </Link>
                </Card.Body>
                <Card.Body className={"search-result-content"}>
                    <Card.Text as="h5">
                        Rating: {professor.rate} / 5
                    </Card.Text>
                    <Card.Text as="p">
                        {professor.comment.length} {professor.comment.length > 1 ? " students" : " student"} commented
                        on this professor.
                    </Card.Text>
                </Card.Body>

            </Card>
        </Col>
    );
}

export default SearchResult;