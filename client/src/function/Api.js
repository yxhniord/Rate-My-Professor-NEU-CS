export const fetchDbUser = async (baseUrl, auth0_id) =>{
    const response = await fetch(`${baseUrl}/user/auth0_id/${auth0_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    });
    return await response.json();
}