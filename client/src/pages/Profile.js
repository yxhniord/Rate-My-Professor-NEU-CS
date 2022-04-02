import React from 'react';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import {ListGroup, ListGroupItem, Tab, Tabs} from "react-bootstrap";
import CommentList from "../components/CommentList";
import "../styles/Profile.css"

function Profile(props) {
    const user = {
        firstName: "Zhiwei",
        lastName: "Bao",
        campus: "Vancouver"
    }
    return (
        <div>
            <Navigation />

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
                            <CommentList />
                        </Tab>
                    </Tabs>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Profile;