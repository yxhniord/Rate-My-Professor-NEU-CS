export const fetchDbUser = async (baseURL, auth0_id) =>{
    const response = await fetch(`${baseURL}/user/auth0_id/${auth0_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
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

export const fetchCommentsByUserId = async (baseURL, userId) => {
    const response = await fetch(`${baseURL}/comment/user/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return await response.json();
}