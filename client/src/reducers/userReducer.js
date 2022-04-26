import {
    REQUEST_USER_INFO,
    LOGOUT,
    SUCCESS,
    FAIL
} from "../constants/actionTypes";

const initialState = {
    user: null,
    loading: false,
    error: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_USER_INFO:
            return {
                ...state,
                loading: true
            };
        case SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            };
        case FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default userReducer;