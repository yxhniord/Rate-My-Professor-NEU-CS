import React, {useEffect, useState} from "react";
import "../styles/UserInfoForm.css";
import {Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";
import {createNewUser, fetchDbUser, updateUser} from "../function/Api";

function UserInfoForm() {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    const {isLoading, isAuthenticated, user, getAccessTokenSilently} = useAuth0();
    const [loading, setLoading] = useState(true);
    const [newNickname, setNewNickname] = useState("nickname");
    const [newCampus, setNewCampus] = useState("Vancouver");
    const [dbUser, setDbUser] = useState(null);
    const handleSumbit = async (e) => {
        e.preventDefault();
        const newUserInfo = {
            nickname: newNickname,
            campus: newCampus,
            auth0_id: user.sub
        };
        const token = await getAccessTokenSilently();
        if (dbUser == null) {
            // create new user
            createNewUser(baseURL, newUserInfo, token)
                .then(() => {
                    navigate('/profile');
                }).catch(err => {
                console.log(err);
                navigate("/error");
            })
        } else {
            // update existing user
            updateUser(baseURL, dbUser._id,newUserInfo, token)
                .then(() => {
                    navigate('/profile');
                }).catch(err => {
                console.log(err);
                navigate("/error");
            })
        }
    };

    useEffect(() => {
        async function fetchData() {
            // fetch dbUser
            const token = await getAccessTokenSilently();
            fetchDbUser(baseURL, user.sub, token)
                .then((data) => {
                    if (data.length !== 0) {
                        let dbUser = data[0];
                        setDbUser(dbUser);
                        setNewNickname(dbUser.nickname);
                        setNewCampus(dbUser.campus);
                    }
                    setLoading(false);
                })

        }

        if (!isLoading && isAuthenticated) {
            fetchData()
                .catch((error) => {
                    console.log(`error from fetching user from database: ${error}`);
                    navigate("/error");
                });
        }

    }, [isLoading]);

    return (
        <div>

            <main>
                <Card className="user-info-form">
                    {isLoading || loading ?
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner> :
                        <>
                            <Card.Header className="user-info-form-title" as="h3">
                                Input Your Information
                            </Card.Header>
                            <Card.Body>
                                <Form className="user-info-form-input">
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                                        <Form.Label column sm="4">
                                            Nickname
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control placeholder="Enter your nickname" autoComplete="off"
                                                          value={newNickname}
                                                          onChange={e => setNewNickname(e.target.value)}/>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                                        <Form.Label column sm="4">
                                            Campus
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control placeholder="Choose you campus" autoComplete="off"
                                                          value={newCampus}
                                                          onChange={e => setNewCampus(e.target.value)}/>
                                        </Col>
                                    </Form.Group>

                                    <br/>

                                    <Button variant="dark" type="submit" onClick={handleSumbit}>
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </>
                    }
                </Card>
            </main>

        </div>
    );
}

export default UserInfoForm;
