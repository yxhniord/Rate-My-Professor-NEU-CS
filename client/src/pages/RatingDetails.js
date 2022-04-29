import React, {useEffect, useState} from 'react';
import "../styles/RatingDetails.css";
import {Spinner} from "react-bootstrap";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import {fetchCommentsByProfessorId, fetchProfessorById} from "../function/Api";
import ProfDescription from "../components/ratingDetails/ProfDescription";
import CommentDetail from "../components/ratingDetails/CommentDetail";

function RatingDetails() {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const {profId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [professor, setProfessor] = useState({});
    const [comments, setComments] = useState([]);

    // Get professor details and comments
    useEffect(() => {
        fetchProfessorById(baseURL, profId)
            .then((data) => {
                setProfessor(data);
            })
            .catch((error) => {
                console.log(error);
                navigate("/error");
            });

        fetchCommentsByProfessorId(baseURL, profId)
            .then((data) => {
                setComments(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                navigate("/error");
            });
    }, [location.key]);

    return (
        <div>

            {loading ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> :
                <main>
                    <ProfDescription professor={professor} comments={comments}></ProfDescription>

                    <CommentDetail comments={comments}></CommentDetail>
                </main>
            }
        </div>
    );
}

export default RatingDetails;