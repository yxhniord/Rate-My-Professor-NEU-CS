import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {useSelector} from "react-redux";

import Search from "../components/home/Search";
import Headline from "../components/home/Headline";
import About from "../components/home/About";
import "../styles/Home.css";

import {fetchCommentsByUserId, fetchProfessorById, fetchTopRateProfessors} from "../function/Api";
import {youtubeAPI, youtubeAPIKey} from "../constants/variables";

function Home() {
    const navigate = useNavigate();
    const {getAccessTokenSilently} = useAuth0();

    // Get user information from Redux store
    const dbUser = useSelector(state => state.user.user);
    const userLoading = useSelector(state => state.user.loading);

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [youtubeLoading, setYoutubeLoading] = useState(true);
    const [videoMetaInfo, setVideoMetaInfo] = useState(null);
    const [comments, setComments] = useState([]);
    const [professors, setProfessors] = useState([]);

    // Functions used in rendering the page
    async function getYouTubePlaylistItems() {
        const res = await fetch(`${youtubeAPI}/search?part=snippet&type=video&q=northeastern+university&maxResults=5&key=${youtubeAPIKey}`);
        return await res.json();
    }

    async function getComments() {
        const token = await getAccessTokenSilently();
        console.log(dbUser)
        fetchCommentsByUserId(dbUser._id, token)
            .then(comments => {
                setComments(comments);
                setProfessors([]);

                // For each comment, get professors from database and store in an array
                for (let comment of comments) {
                    fetchProfessorById(comment.professor)
                        .then(professor => {
                            setProfessors(professors => [...professors, professor]);
                        })
                }
                setLoading(false);
            })
    }

    useEffect(() => {

        getYouTubePlaylistItems()
            .then((res) => {
                if (res?.error) {
                    return;
                }
                const index = Math.floor(Math.random() * res.items.length);
                setVideoMetaInfo(res.items[index]);
                setYoutubeLoading(false);
            })
            .catch(err => {
                console.log(err);
            });

        // Display user comments if authenticated, otherwise display top professors
        if (!userLoading) {
            if (dbUser) {
                getComments()
                    .catch((err) => {
                        console.log(err);
                        navigate("/error");
                    });
            } else {
                fetchTopRateProfessors()
                    .then(data => {
                        setProfessors(data);
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.log(err);
                        navigate("/error");
                    });
            }
        }

    }, [youtubeLoading, userLoading, dbUser]);

    // Function used to interact with database and other pages
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search/${name}`, {replace: true});
        setName("");
    };

    return (

        <main>
            <Search name={name} setName={setName} handleSubmit={handleSubmit}/>

            <Headline loading={loading} dbUser={dbUser} comments={comments} professors={professors}/>

            <About youtubeLoading={youtubeLoading} videoMetaInfo={videoMetaInfo} />
        </main>
    );
}

export default Home;