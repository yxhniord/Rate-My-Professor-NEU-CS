import React, {useEffect, useState} from "react";
import "../styles/UserInfoForm.css";
import {Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";
import {createNewUser, updateUser} from "../function/Api";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserFail, fetchUserRequest, fetchUserSuccess} from "../actions/userActions";

function UserInfoForm() {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    const {isLoading, user, getAccessTokenSilently} = useAuth0();
    const loading = useSelector(state => state.user.loading);
    const [newNickname, setNewNickname] = useState("");
    const [newCampus, setNewCampus] = useState("Vancouver");
    const dbUser = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (dbUser) {
            setNewNickname(dbUser.nickname);
            setNewCampus(dbUser.campus);
        }
    }, []);


    const createUser = (baseURL, newUserInfo, token) => {
        return async function (dispatch) {
            dispatch(fetchUserRequest());
            await createNewUser(baseURL, newUserInfo, token)
                .then((res) => {
                    navigate('/profile/user-info');
                    dispatch(fetchUserSuccess(res));
                })
                .then(error => dispatch(fetchUserFail(error)))
        }
    }

    const updateUserInfo = (baseURL, userId, newUserInfo, token) => {
        return async function (dispatch) {
            dispatch(fetchUserRequest());
            await updateUser(baseURL, userId, newUserInfo, token)
                .then((res) => {
                    navigate('/profile/user-info');
                    dispatch(fetchUserSuccess(res));
                })
                .then(error => dispatch(fetchUserFail(error)))
        }
    }

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
            dispatch(createUser(baseURL, newUserInfo, token));
        } else {
            // update existing user
            dispatch(updateUserInfo(baseURL, dbUser._id, newUserInfo, token));
        }
    };

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
