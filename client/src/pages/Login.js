import React from 'react';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import {Button, Card, Form} from "react-bootstrap";
import "../styles/Login.css";
import {Link} from "react-router-dom";

function Login(props) {
    return (
        <div>
            <Navigation/>

            <main>
                <Card className="login-area">
                    <Card.Header className="login-title" as="h3">
                        Login
                    </Card.Header>
                    <Card.Body>
                        <Form className="login-input">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" autoComplete="off"/>
                                <Form.Text className="text-muted">
                                    Enter your email address to login.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" autoComplete="off"/>
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
                            Don't have an account? {""}
                            <Link to="/signup">
                                Signup
                            </Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </main>

            <Footer/>
        </div>
    );
}

export default Login;