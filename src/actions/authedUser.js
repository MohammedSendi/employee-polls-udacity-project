import {checkUserCredenrials} from '../utils/API'
import {showLoading, hideLoading} from "react-redux-loading-bar"

export const SET_AUTHED_USER = "SET_AUTHED_USER"

function setAuthedUser(id, password) {
    return {
        type: SET_AUTHED_USER,
        id,
        password,
    };
}

export function handleLogin(id, password){
    return (dispatch) => {
        dispatch(showLoading());
        return checkUserCredenrials(id, password)
        .then(dispatch(setAuthedUser(id, password)))
        .then(() => dispatch(hideLoading()))
    }
}