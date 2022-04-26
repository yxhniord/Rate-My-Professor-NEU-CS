import {
    REQUEST_USER_INFO,
    LOGOUT,
    SUCCESS,
    FAIL
} from "../constants/actionTypes";


// Action creators
// Request user info
export const fetchUserRequest = () => {
    return {
        type: REQUEST_USER_INFO
    }
};

// Request success
export const fetchUserSuccess = (user) => {
    return {
        type: SUCCESS,
        payload: user
    }
};

// Request fail
export const fetchUserFail = (error) => {
    return {
        type: FAIL,
        payload: error
    }
};

// Logout
export const userLogout = () => {
    return {
        type: LOGOUT
    }
};