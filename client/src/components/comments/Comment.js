import React, {useEffect, useState} from 'react';
import {Alert, Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import moment from "moment";
import "../../styles/Comment.css";
import {useNavigate} from "react-router-dom";
import {fetchProfessorById} from "../../function/Api";

function Comment({data, fn}) {
    const comment = data;
    const deleteComment = fn;

    const navigate = useNavigate();
    const [professor, setProfessor] = useState(null);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    useEffect(() => {

        fetchProfessorById(comment.professor)
            .then((data) => {
                setProfessor(data);
            })
            .catch((err) => {
                console.log(err);
                navigate("/error");
            });
    }, []);

    return (
        <>
            <Alert show={showDeleteAlert} variant="warning">
                <Alert.Heading>Warning!</Alert.Heading>
                <p>
                    Are you sure you want to delete this comment? It cannot be reverted.
                </p>
                <hr/>
                <div className="d-flex justify-content-end">
                    <Button className="me-3" onClick={() => deleteComment(comment._id)} variant="outline-danger">
                        Delete
                    </Button>
                    <Button onClick={() => setShowDeleteAlert(false)} variant="outline-warning">
                        Cancel
                    </Button>
                </div>
            </Alert>
            <Card className="mb-3">
                <Card.Header className="comment-header">
                    {professor != null ?
                        <span role="button"
                              onClick={() => navigate(`/details/${professor._id}`)}>
                            {professor?.first_name} {professor?.last_name}
                        </span> :
                        <span>Loading</span>
                    }
                    <div className="icons">
                        <FontAwesomeIcon role="button" className="edit-icon" icon={faPenToSquare}
                                         onClick={() => navigate(`/updateComment/${comment._id}`)}/>
                        <FontAwesomeIcon role="button" className="delete-icon" icon={faTrashCan}
                                         onClick={() => setShowDeleteAlert(true)}/>
                    </div>
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
        </>
    );
}

export default Comment;