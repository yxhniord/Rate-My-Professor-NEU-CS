import React from 'react';
import {Button, Card, Form} from "react-bootstrap";
import "../styles/Login.css";
import {Link} from "react-router-dom";

function Signup(props) {
    return (
        <div>

            <main>
                <Card className="login-area">
                    <Card.Header className="login-title" as="h3">
                        Signup
                    </Card.Header>
                    <Card.Body>
                        <Form className="login-input">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"/>
                                <Form.Text className="text-muted">
                                    Enter your email address to login.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password"/>
                                <Form.Text className="text-muted">
                                    Enter your password.
                                </Form.Text>
                            </Form.Group>
                            <br/>
                            <Button variant="dark" type="submit">
                                Submit
                            </Button>
                        </Form>
                        <Card.Text>
                            Have an account? {" "}
                            <Link to="/login">
                                Login
                            </Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </main>

        </div>
    );
}

export default Signup;