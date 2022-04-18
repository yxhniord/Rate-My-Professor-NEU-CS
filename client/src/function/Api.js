export const fetchDbUser = async (baseURL, auth0_id, token) => {
    const response = await fetch(`${baseURL}/user/auth0_id/${auth0_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
}

export const createNewUser = async (baseURL, user, token) => {
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

export const updateUser = async (baseURL, userId, user, token) => {
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

export const fetchProfessorById = async (baseURL, profId) => {
    const response = await fetch(`${baseURL}/professor/id/${profId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return await response.json();
}

export const fetchProfessorsByName = async (baseURL, name) => {
    const response = await fetch(`${baseURL}/professor/name/${name}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return await response.json();
}

export const createProfessor = async (baseURL, createdNewProfessor, token) => {
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

export const fetchCommentsByProfessorId = async (baseURL, profId) => {
    const response = await fetch(`${baseURL}/comment/professor/${profId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return await response.json();
}

export const fetchCommentById = async (baseURL, commentId) => {
    const response = await fetch(`${baseURL}/comment/id/${commentId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return await response.json();
}

export const fetchCommentsByUserId = async (baseURL, userId, token) => {
    const response = await fetch(`${baseURL}/comment/user/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
}

export const createComment = async (baseURL, createdNewComment, token) => {
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

export const updateComment = async (baseURL, commentId, createdNewComment, token) => {
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

export const deleteCommentByCommentId = async (baseURL, commentId, token) => {
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
