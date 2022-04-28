import React, {useContext, useEffect, useState} from 'react';
import {Button, ListGroup, ListGroupItem, Spinner, Tab, Tabs} from "react-bootstrap";
import CommentList from "../components/CommentList";
import "../styles/Profile.css"
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate, useParams} from "react-router-dom";
import {fetchDbUser, deleteCommentByCommentId, fetchCommentsByUserId} from "../function/Api.js";
import {UserContext} from "../function/context";

function Profile() {
    const {isAuthenticated, isLoading, user, getAccessTokenSilently} = useAuth0();
    const [loading, setLoading] = useState(true);
    const baseURL = process.env.REACT_APP_BASE_URL;
    const tabKey = useParams().key;
    const [key, setKey] = useState(tabKey);
    // const [dbUser, setDbUser] = useState(null);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const {userContext} = useContext(UserContext);

    useEffect(() => {
        async function getComments() {
            const token = await getAccessTokenSilently();
            fetchCommentsByUserId(baseURL, userContext.user._id, token)
                .then(data => {
                    setComments(data);
                    setLoading(false);
                });
        }

        if (!userContext.userLoading && userContext.user) {
            getComments()
                .catch(err => {
                    console.log(err);
                    navigate("/error");
                });
        } else {
            // prevent bug
            setLoading(false);
        }
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
                            {isLoading || userContext.userLoading || userContext.user === null ?
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner> :
                                <ListGroup variant="flush">
                                    <ListGroupItem><strong>Nickname:</strong> {userContext.user ? userContext.user.nickname : user.nickname}
                                    </ListGroupItem>
                                    <ListGroupItem><strong>Email:</strong> {user.email}</ListGroupItem>
                                    <ListGroupItem><strong>Campus:</strong> {userContext.user.campus}</ListGroupItem>
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