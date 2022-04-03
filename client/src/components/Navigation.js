import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGraduationCap, faUser} from '@fortawesome/free-solid-svg-icons'
import "../styles/Navigation.css";
import {Link} from "react-router-dom";


function Navigation() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Link to={"/"} style={{textDecoration: 'none'}}>
                    <Navbar.Brand>
                        <FontAwesomeIcon className="head-icon" icon={faGraduationCap}/>
                        <span className="head-text">
                        NEU Rate My Professor
                    </span>
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/*TODO: conditional rendering: only show them on home page*/}
                    <Nav className="me-auto option-text">
                        <Nav.Link href="#search">Search</Nav.Link>
                        <Nav.Link href="#headline">Top-Professors</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link className="login">
                            {/*TODO: Need conditional name rendering*/}
                            <div className="login-text">
                                <span className="login-greeting">
                                    Hello, {"User"}
                                </span>
                                <Link to={"/login"} style={{textDecorationColor: 'white'}}>
                                    <span className="login-login">
                                        Login
                                    </span>
                                </Link>
                            </div>
                            {/*TODO: change link*/}
                            <Link to={"/details/1"} style={{textDecoration: 'none', color: "white"}}>
                                <FontAwesomeIcon className="login-icon" icon={faUser}/>
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;