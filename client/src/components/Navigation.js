import React, {useEffect, useState} from 'react';
import {Container, Nav, Navbar, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGraduationCap, faUser} from '@fortawesome/free-solid-svg-icons'
import "../styles/Navigation.css";
import {Link, useNavigate} from "react-router-dom";
import {HashLink} from 'react-router-hash-link';
import {useAuth0} from "@auth0/auth0-react";
import {fetchDbUser} from "../function/Api.js";


function Navigation() {
    const {isLoading, isAuthenticated, loginWithRedirect, logout, user} = useAuth0();
    const [loading, setLoading] = useState(true);
    const baseUrl = process.env.REACT_APP_BACKEND_URL;
    const [dbUser, setDbUser] = React.useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            fetchDbUser(baseUrl, user.sub)
                .then(dbUsers => {
                    setDbUser(dbUsers[0]);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    navigate("/error");
                });
        }
    }, [isAuthenticated, user]);


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
                    <Nav className="me-auto option-text">
                        <Nav.Link as={HashLink} to={"/#search"}>Search</Nav.Link>
                        <Nav.Link as={HashLink} to={"/#headline"}>Top-Professors</Nav.Link>
                        <Nav.Link as={HashLink} to={"/#about"}>About</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Item className="login login-text">
                            {/*TODO: Need conditional name rendering*/}

                            {isLoading ?
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner> :
                                <>
                                    {isAuthenticated ? (
                                        <Nav.Item className="login-text" >
                                                    <span className="login-login" onClick={() => {
                                                        logout({returnTo: window.location.origin})
                                                    }}>
                                                        {' '}
                                                        {'Logout    '}
                                                    </span>
                                            <Link to={"/profile"}
                                                  style={{textDecoration: 'none', color: "white"}}>
                                                {loading ?
                                                    <Spinner animation="border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </Spinner> :
                                                    <span className="login-login">
                                                            {'Hello, '}
                                                        {dbUser ? dbUser.nickname : user.nickname}
                                                        </span>}
                                                <FontAwesomeIcon className="login-icon" icon={faUser}/>
                                            </Link>
                                        </Nav.Item>
                                    ) : (
                                        <Nav.Link style={{textDecorationColor: 'white'}} className="login-text" >
                                            <span className="login-login" onClick={loginWithRedirect}>
                                                {' '}
                                                {'Login'}
                                            </span>
                                            <FontAwesomeIcon className="login-icon" icon={faUser}
                                                             onClick={loginWithRedirect}/>
                                        </Nav.Link>
                                    )}
                                </>
                            }
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;