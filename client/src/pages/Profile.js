import React, {useEffect, useState} from 'react';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import {ListGroup, ListGroupItem, Spinner, Tab, Tabs} from "react-bootstrap";
import CommentList from "../components/CommentList";
import "../styles/Profile.css"
import {useNavigate} from "react-router-dom";

function Profile(props) {
    const baseUrl = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const id = '6250a8293e4be92ae062e5c0';

    useEffect(() => {
        async function fetchUser() {
            const data = await fetch(`${baseUrl}/user/${id}`);
            const jsonData = await data.json();
            setUser(jsonData);
            setLoading(false);
        }

        fetchUser().catch((err) => {
            console.log(err);
            navigate("/error");
        });
    }, []);

    return (
        <div>
            <Navigation/>

            <main>
                <div className="profile-area">
                    <Tabs defaultActiveKey="user-info" id="profile-tabs" className="mb-3">
                        <Tab eventKey="user-info" title="Profile">
                            {loading ?
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner> :
                                <ListGroup variant="flush">
                                    <ListGroupItem>First Name: {user.first_name}</ListGroupItem>
                                    <ListGroupItem>Last Name: {user.last_name}</ListGroupItem>
                                    <ListGroupItem>Campus: {user.campus}</ListGroupItem>
                                </ListGroup>
                            }
                        </Tab>
                        <Tab eventKey="user-comments" title="My Ratings">
                            <CommentList userId={id}/>
                        </Tab>
                    </Tabs>
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default Profile;