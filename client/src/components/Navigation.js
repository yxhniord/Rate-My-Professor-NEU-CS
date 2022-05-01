import React from 'react';
import {Container, Nav, Navbar, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGraduationCap, faUser} from '@fortawesome/free-solid-svg-icons'
import "../styles/Navigation.css";
import {Link} from "react-router-dom";
import {HashLink} from 'react-router-hash-link';
import {useAuth0} from "@auth0/auth0-react";
import {useDispatch, useSelector} from "react-redux";
import {userLogout} from "../actions/userActions";


function Navigation() {
    const {isLoading, isAuthenticated, loginWithRedirect, logout, user} = useAuth0();
    const dbUser = useSelector(state => state.user.user);
    const loading = useSelector(state => state.user.loading);
    const dispatch = useDispatch();

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
                        <Nav.Link as={HashLink} to={"/#headline"}>{isAuthenticated ? "Comments" : "Top-Professors"}</Nav.Link>
                        <Nav.Link as={HashLink} to={"/#about"}>About</Nav.Link>
                    </Nav>

                    <Nav>
                        {isAuthenticated ? (
                            <Nav.Item className="login">
                                {loading || isLoading ?
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner> :
                                    <>
                                        <div className="login-text">
                                            <Link role="button" to={"/profile/user-info"}
                                                  style={{textDecoration: 'none', color: "white"}}>
                                                        <span>
                                                            {'Hello, '}
                                                            {dbUser ? dbUser.nickname : user.nickname}
                                                        </span>
                                            </Link>
                                            <span role="button" className="logout-text" onClick={() => {
                                                logout({returnTo: window.location.origin});
                                                dispatch(userLogout());
                                            }}>
                                                {' '}
                                                {'Logout'}
                                            </span>
                                        </div>
                                        <Link role="button" to={"/profile/user-info"}
                                              style={{textDecoration: 'none', color: "white"}}>
                                            <FontAwesomeIcon className="login-icon" icon={faUser}/>
                                        </Link>
                                    </>}
                            </Nav.Item>
                        ) : (
                            <Nav.Item className="login">
                                <span role="button" className="login-text" onClick={loginWithRedirect}>
                                    {' '}
                                    {'Login'}
                                </span>
                                <FontAwesomeIcon role="button" className="login-icon" icon={faUser}
                                                 onClick={loginWithRedirect}/>
                            </Nav.Item>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;