import {getInitialData} from "../utils/API"
import {receiveUsers} from './users'
import { receiveQuestions } from "./questions"
import { setAuthedUser } from "./authedUser";

const temp_auth = "mtsamis"

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData().then((users, questions) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
            dispatch(setAuthedUser(temp_auth))
        });
    };
}