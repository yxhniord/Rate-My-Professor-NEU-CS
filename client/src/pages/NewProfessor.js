import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Alert, Button, Card, Col, Form, Row} from "react-bootstrap";
import "../styles/NewProfessor.css";
import {createProfessor} from "../function/Api";
import {useAuth0} from "@auth0/auth0-react";

function NewProfessor() {
    const navigate = useNavigate();
    const {getAccessTokenSilently} = useAuth0();

    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [wrongInputMessage, setWrongInputMessage] = useState([]);

    // Called when the submit button is clicked
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Reset error message everytime submit button is clicked
        setWrongInputMessage([]);

        // New professor JSON object
        const createdNewProfessor = {
            first_name: fName,
            last_name: lName,
        };
        const token = await getAccessTokenSilently();

        createProfessor(createdNewProfessor, token)
            .then(response => {
                if (response.message !== undefined) {
                    let array = []
                    for (let m of response.message) {
                        array.push(m.msg);
                    }
                    setWrongInputMessage(array);
                } else {
                    navigate(`/details/${response._id}`)
                }
            })

    };

    return (
        <div>

            <main>

                {wrongInputMessage.length > 0 &&
                    <Alert className="wrong-input-alert" variant="danger" dismissible>
                        <Alert.Heading>Some required fields are missing!</Alert.Heading>
                        {wrongInputMessage.map((errMessage, index) => <p
                            key={index}>{index + 1}: {errMessage}</p>)}
                    </Alert>
                }

                <Card className="new-professor-area">
                    <Card.Header className="new-professor-title" as="h3">
                        No professor found?
                    </Card.Header>
                    <Card.Body>
                        <Form className="new-professor-input">

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                                <Form.Label column md="4">
                                    First Name
                                </Form.Label>
                                <Col md="8">
                                    <Form.Control placeholder="" autoComplete="off" value={
                                        fName
                                    } onChange={(e) => {
                                        setFName(e.target.value)
                                    }}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                                <Form.Label column md="4">
                                    Last Name
                                </Form.Label>
                                <Col md="8">
                                    <Form.Control placeholder="" autoComplete="off" value={
                                        lName
                                    } onChange={(e) => {
                                        setLName(e.target.value)
                                    }}/>
                                </Col>
                            </Form.Group>

                            <p>All fields are required</p>

                            <br/>
                            <Button className="mb-3" variant="dark" type="submit" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

            </main>

        </div>

    );
}

export default NewProfessor;