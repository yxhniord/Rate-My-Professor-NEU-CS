import {baseURL} from "../constants/variables";

// User

export const fetchDbUser = async (auth0_id, token) => {
    const response = await fetch(`${baseURL}/user/auth0_id/${auth0_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const users = await response.json();
    return users.length === 0 ? null : users[0];
}

export const createNewUser = async (user, token) => {
    const response = await fetch(`${baseURL}/user/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)
    });
    return await response.json();
}

export const updateUser = async (userId, user, token) => {
    const response = await fetch(`${baseURL}/user/update/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user)
    });
    return await response.json();
}

// Professor

export const fetchProfessorById = async (profId) => {
    const response = await fetch(`${baseURL}/professor/id/${profId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return await response.json();
}

export const fetchProfessorsByName = async (name) => {
    const response = await fetch(`${baseURL}/professor/name/${name}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return await response.json();
}

export const fetchTopRateProfessors = async () => {
    const response = await fetch(`${baseURL}/professor/list`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return await response.json();
}

export const createProfessor = async (createdNewProfessor, token) => {
    const response = await fetch(`${baseURL}/professor/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(createdNewProfessor)
    });

    return await response.json();
}

// Comments

export const fetchCommentsByProfessorId = async (profId) => {
    const response = await fetch(`${baseURL}/comment/professor/${profId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return await response.json();
}

export const fetchCommentById = async (commentId) => {
    const response = await fetch(`${baseURL}/comment/id/${commentId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return await response.json();
}

export const fetchCommentsByUserId = async (userId, token) => {
    const response = await fetch(`${baseURL}/comment/user/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
}

export const createComment = async (createdNewComment, token) => {
    const response = await fetch(`${baseURL}/comment/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(createdNewComment)
    });

    return response.status === 500 ? await response.json() : null;
}

export const updateComment = async (commentId, createdNewComment, token) => {
    const response = await fetch(`${baseURL}/comment/update/${commentId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(createdNewComment)
    });

    return response.status === 500 ? await response.json() : null;
}

export const deleteCommentByCommentId = async (commentId, token) => {
    const response = await fetch(`${baseURL}/comment/delete/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    return await response.json();
}
