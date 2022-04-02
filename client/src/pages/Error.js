import React from 'react';
import {Alert, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFaceSadTear} from "@fortawesome/free-solid-svg-icons";
import "../styles/Error.css";

function Error() {
    return (
        <main className="error-page">
            <Alert className="error-message" show variant="danger">
                <Alert.Heading>Oops!</Alert.Heading>
                <p>
                    An error occurred while loading the page.
                    {" "}
                    <FontAwesomeIcon icon={faFaceSadTear}/>
                </p>
                <p>
                    Please contact the developer team.
                </p>
                <hr/>
                <div className="d-flex justify-content-end">
                    <Button variant="outline-danger" as={Link} to={"/"}>
                        Back to home
                    </Button>
                </div>
            </Alert>

        </main>
    );
}

export default Error;