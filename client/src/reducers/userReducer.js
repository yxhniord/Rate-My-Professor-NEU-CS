import {
    GET_USER_INFO,
    CREATE_USER_INFO,
    UPDATE_USER_INFO,
    LOGOUT
} from "../constants/actionTypes";

const userReducer = (user = {}, action) => {
    switch (action.type) {
        case GET_USER_INFO:
            console.log("GET_USER_INFO", action.payload);
            return action.payload;
        case CREATE_USER_INFO:
            return action.payload;
        case UPDATE_USER_INFO:
            return action.payload;
        case LOGOUT:
            return null;
        default:
            return user;
    }
}

export default userReducer;