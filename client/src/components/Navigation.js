import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGraduationCap, faUser} from '@fortawesome/free-solid-svg-icons'
import "../styles/Navigation.css";


function Navigation() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    <FontAwesomeIcon className="head-icon" icon={faGraduationCap}/>
                    <span className="head-text">
                        NEU Rate My Professor
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto option-text">
                        <Nav.Link href="#search">Search</Nav.Link>
                        <Nav.Link href="#headline">Top-Professors</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link className="login">
                            {/*TODO: Need conditional rendering*/}
                            <div className="login-text">
                                <span className="login-greeting">
                                    Hello, {"User"}
                                </span>
                                <span className="login-login">
                                    Signup / Login
                                </span>
                            </div>
                            <FontAwesomeIcon className="login-icon" icon={faUser}/>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;