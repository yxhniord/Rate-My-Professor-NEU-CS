import React, {useEffect, useState} from 'react';
import "../styles/RatingDetails.css";
import {Spinner} from "react-bootstrap";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import {fetchCommentsByProfessorId, fetchProfessorById} from "../function/Api";
import ProfDescription from "../components/ratingDetails/ProfDescription";
import CommentDetailList from "../components/ratingDetails/CommentDetailList";

function RatingDetails() {
    const {profId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(true);
    const [professor, setProfessor] = useState({});
    const [comments, setComments] = useState([]);

    // Get professor details and comments
    useEffect(() => {
        fetchProfessorById(profId)
            .then((data) => {
                setProfessor(data);
            })
            .catch((error) => {
                console.log(error);
                navigate("/error");
            });

        fetchCommentsByProfessorId(profId)
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

                    <CommentDetailList comments={comments}></CommentDetailList>
                </main>
            }
        </div>
    );
}

export default RatingDetails;