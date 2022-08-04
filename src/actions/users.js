export const RECEIVE_USERS = "RECEIVE_USERS"
export const ADD_QUESTION = "ADD_QUESTION"
export const ADD_ANSWER = "ADD_ANSWER"

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function addQuestion(id, question){
    return {
        type: ADD_QUESTION,
        id,
        question,
    }
}

export function addAnswer(answer){
    console.log(answer.authedUser)
    return {
        type: ADD_ANSWER,
        id : answer.authedUser,
        qid : answer.qid,
        answer : answer.answer
    }
}