import React, {useEffect} from 'react';
import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import moment from "moment";
import "../styles/Comment.css";
import {useNavigate} from "react-router-dom";
import {fetchProfessorById} from "../function/Api";

function Comment({comment}) {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    const [professor, setProfessor] = React.useState(null);

    useEffect(() => {

        fetchProfessorById(baseUrl, comment.professor)
            .then((data) => {
                setProfessor(data);
            })
            .catch((err) => {
                console.log(err);
                navigate("/error");
            });
    }, []);

    return (
        <Card className="mb-3">
            <Card.Header className="comment-header">
                {professor != null ?
                    <span role="button"
                          onClick={() => navigate(`/details/${professor._id}`)}>
                        {professor?.first_name} {professor?.last_name}
                    </span> :
                    <span>Loading</span>
                }
                <FontAwesomeIcon role="button" className="edit-icon" icon={faPenToSquare}
                                 onClick={() => navigate(`/updateComment/${comment._id}`)}/>
            </Card.Header>
            <Card.Body>
                <Card.Title>
                    {comment.course} &nbsp;&nbsp;
                    {moment(comment.date).format('MMM Do YYYY')}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Campus: {comment.campus} |
                    Grade: {comment.rate}</Card.Subtitle>
                <Card.Text>{comment.content}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Comment;