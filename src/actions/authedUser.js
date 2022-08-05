import {checkUserCredenrials} from '../utils/API'
import {showLoading, hideLoading} from "react-redux-loading-bar"

export const SET_AUTHED_USER = "SET_AUTHED_USER"
export const LOGOUT_USER = "LOGOUT_USER"

export function logoutUser(){
    return {
        type: LOGOUT_USER
    }
}

function setAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        id,
    };
}

export function handleLogin(id, password){
    return (dispatch) => {
        
        dispatch(showLoading());
        return new Promise(() => { 
            checkUserCredenrials(id, password).then(user => {
                dispatch(setAuthedUser(user.id))
                dispatch(hideLoading())
            }).catch(() => dispatch(hideLoading()))

        })



    }
}