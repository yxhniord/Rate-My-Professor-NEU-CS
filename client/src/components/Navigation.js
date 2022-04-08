import React, {useEffect} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGraduationCap, faUser} from '@fortawesome/free-solid-svg-icons'
import "../styles/Navigation.css";
import {Link, useNavigate} from "react-router-dom";
import {HashLink} from 'react-router-hash-link';
import {useAuth0} from "@auth0/auth0-react";


function Navigation() {
    const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0();
    const baseUrl = process.env.REACT_APP_BACKEND_URL;
    const [dbUser, setDbUser] = React.useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDbUser() {
            const response = await fetch(`${baseUrl}/user/auth0_id/${user.sub}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            const dbUser = await response.json();
            setDbUser(dbUser[0]);
        }

        if (isAuthenticated) {
            fetchDbUser().catch(err => {
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
                            {isAuthenticated ? (
                                <>
                                    <Nav.Link as={Link} to={"/profile"}
                                              style={{textDecoration: 'none', color: "white"}}>
                                    <span className="login-login">
                                        {'Hello, '}
                                        {dbUser ? dbUser.nick_name : user.nickname}
                                    </span>
                                    </Nav.Link>
                                    <Nav.Item>
                                        <span className="login-login" onClick={() => {
                                            logout({returnTo: window.location.origin})
                                        }}>
                                            {' '}
                                            {'Logout'}
                                        </span>
                                        <FontAwesomeIcon className="login-icon" icon={faUser}/>
                                    </Nav.Item>
                                </>
                            ) : (
                                <Nav.Link style={{textDecorationColor: 'white'}}>
                                    <span className="login-login" onClick={loginWithRedirect}>
                                        {' '}
                                        {'Login'}
                                    </span>
                                    <FontAwesomeIcon className="login-icon" icon={faUser} onClick={loginWithRedirect}/>
                                </Nav.Link>
                            )}
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;