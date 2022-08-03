import {getInitialData} from "../utils/API"
import {receiveUsers} from './users'
import { receiveQuestions } from "./questions"
import { setAuthedUser } from "./authedUser";
import {showLoading, hideLoading} from "react-redux-loading-bar"
const temp_auth = "mtsamis"

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData().then(({users, questions}) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
            //dispatch(setAuthedUser(temp_auth))
            dispatch(hideLoading())
        });
    };
}