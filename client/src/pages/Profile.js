import React, {useEffect, useState} from 'react';
import {Button, ListGroup, ListGroupItem, Spinner, Tab, Tabs} from "react-bootstrap";
import CommentList from "../components/comments/CommentList";
import "../styles/Profile.css"
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate, useParams} from "react-router-dom";
import {deleteCommentByCommentId, fetchCommentsByUserId} from "../function/Api.js";
import {useSelector} from "react-redux";

function Profile() {
    const {isAuthenticated, isLoading, user, getAccessTokenSilently} = useAuth0();
    const [loading, setLoading] = useState(true);
    const baseURL = process.env.REACT_APP_BASE_URL;
    const tabKey = useParams().key;
    const [key, setKey] = useState(tabKey);
    const dbUser = useSelector(state => state.user.user);
    const userLoading = useSelector(state => state.user.loading);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        let isSubscribed = true;

        async function fetchData() {
            const token = await getAccessTokenSilently();

            fetchCommentsByUserId(baseURL, dbUser._id, token)
                .then(data => {
                    if (isSubscribed) {
                        setComments(data);
                    }
                });
            if (isSubscribed) {
                setLoading(false);
            }
        }

        if (isAuthenticated && !userLoading && dbUser) {
            fetchData()
                .catch(err => {
                    console.log(err);
                    navigate("/error");
                });
        } else {
            setLoading(false);
        }

        return () => isSubscribed = false;
    }, [isLoading, isAuthenticated, comments.length]);

    const deleteComment = (commentId) => {
        setLoading(true);
        getAccessTokenSilently()
            .then(token => {
                deleteCommentByCommentId(baseURL, commentId, token)
                    .then(res => {
                        if (res) {
                            setComments(comments.filter(comment => comment._id !== commentId));
                            setLoading(false);
                        } else {
                            console.log("Error deleting comment");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        navigate("/error");
                    });
            })
            .catch(err => {
                console.log(err);
                navigate("/error");
            });
    };

    return (
        <div>

            <main>
                <div className="profile-area">
                    <Tabs id="profile-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
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
                            {comments.length !== 0 && <CommentList comments={comments} deleteComment={deleteComment}/>}
                        </Tab>
                    </Tabs>
                </div>
            </main>

        </div>
    );
}

export default Profile;