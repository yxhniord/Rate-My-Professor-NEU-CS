import React, {useEffect, useState} from 'react';
import {Button, ListGroup, ListGroupItem, Spinner, Tab, Tabs} from "react-bootstrap";
import CommentList from "../components/CommentList";
import "../styles/Profile.css"
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";
import {fetchDbUser} from "../function/Api.js";

function Profile() {
    const {isAuthenticated, isLoading, user, getAccessTokenSilently} = useAuth0();
    const [loading, setLoading] = useState(true);
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [dbUser, setDbUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchData() {
            const token = await getAccessTokenSilently();
            fetchDbUser(baseURL, user.sub, token)
                .then(dbUsers => {
                    if (dbUsers.length === 0) {
                        navigate("/userInfoForm");
                    } else {
                        setDbUser(dbUsers[0]);
                        setLoading(false);
                    }
                });
        }

        if (isAuthenticated) {
            fetchData()
                .catch(err => {
                    console.log(err);
                    navigate("/error");
                });
        }
    }, [isLoading, isAuthenticated]);

    return (
        <div>

            <main>
                <div className="profile-area">
                    <Tabs defaultActiveKey="user-info" id="profile-tabs" className="mb-3">
                        <Tab eventKey="user-info" title="Profile">
                            {loading || isLoading || dbUser == null ?
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner> :
                                <ListGroup variant="flush">
                                    <ListGroupItem><strong>Nickname:</strong> {dbUser ? dbUser.nickname : user.nickname}
                                    </ListGroupItem>
                                    <ListGroupItem><strong>Email:</strong> {user.email}</ListGroupItem>
                                    <ListGroupItem><strong>Campus:</strong> {dbUser.campus}</ListGroupItem>
                                    <ListGroupItem>
                                        <Button variant="dark" onClick={() => navigate(`/userInfoForm`)}>
                                            Edit
                                        </Button>
                                    </ListGroupItem>
                                </ListGroup>
                            }
                        </Tab>
                        <Tab eventKey="user-comments" title="My Ratings">
                            {dbUser != null && <CommentList userId={dbUser._id}/>}
                        </Tab>
                    </Tabs>
                </div>
            </main>

        </div>
    );
}

export default Profile;