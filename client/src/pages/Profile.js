import React, {useEffect, useState} from 'react';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import {ListGroup, ListGroupItem, Tab, Tabs} from "react-bootstrap";
import CommentList from "../components/CommentList";
import "../styles/Profile.css"

function Profile(props) {
    const baseUrl = process.env.REACT_APP_BACKEND_URL;
    const [user, setUser] = useState({});
    const id = '62460604d66bdbab801b2c5b';
    useEffect(() => {
        async function fetchUser() {
            const data = await fetch(`${baseUrl}/user/${id}`);
            const jsonData = data.json();
            setUser(jsonData);
        }

        fetchUser();
    }, [user]);
    return (
        <div>
            <Navigation/>

            <main>
                <div className="profile-area">
                    <Tabs defaultActiveKey="user-info" id="profile-tabs" className="mb-3">
                        <Tab eventKey="user-info" title="Profile">
                            <ListGroup variant="flush">
                                <ListGroupItem>First Name: {user.firstName}</ListGroupItem>
                                <ListGroupItem>Last Name: {user.lastName}</ListGroupItem>
                                <ListGroupItem>Campus: {user.campus}</ListGroupItem>
                            </ListGroup>
                        </Tab>
                        <Tab eventKey="user-comments" title="My Ratings">
                            <CommentList/>
                        </Tab>
                    </Tabs>
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default Profile;