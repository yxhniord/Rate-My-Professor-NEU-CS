import {
    GET_USER_INFO,
    CREATE_USER_INFO,
    UPDATE_USER_INFO,
    LOGOUT,
    FAIL
} from "../constants/actionTypes";
import {fetchDbUser} from "../function/Api";

// Action creators
// GET: user
export const getUserInfo = (baseURL, auth0_id, token) => async (dispatch) => {
    try {
        const user = await fetchDbUser(baseURL, auth0_id, token);
        const action = {
            type: GET_USER_INFO,
            payload: user
        };
        dispatch(action);
    } catch (e) {
        console.log(`Fail to get user info: ${e}`);
        dispatch({
            type: FAIL,
            payload: e
        });
    }
};

// CREATE: user
export const createUserInfo = async (dispatch, user) => {
    try {
        const action = {
            type: CREATE_USER_INFO,
            payload: user
        };
        dispatch(action);
    } catch (e) {
        console.log(`Fail to create user info: ${e}`);
        dispatch({
            type: FAIL,
            payload: e
        });
    }
};