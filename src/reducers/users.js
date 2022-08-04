import {RECEIVE_USERS, ADD_ANSWER, ADD_QUESTION} from "../actions/users"

export default function users(state = {} , action){
    switch (action.type) {
        case RECEIVE_USERS:
            return{
                ...state,
                ...action.users 
            }
        case ADD_QUESTION:
            return{
                ...state,
                [action.id]: {
                    ...state[action.id],
                    questions: [...state[action.id].questions, action.question]
                }
            }
        case ADD_ANSWER:
            const answers = state[action.id].answers
            const id = action.id
            const qid = action.qid
            const answer = action.answer
            return{
                ...state,
                [id]: {
                    ...state[id],
                    answers: {...answers, [qid] : answer}
                }
            }
        default:
            return state
    }
}