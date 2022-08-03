import {RECEIVE_QUESTIONS, SAVE_QUESTION, SAVE_ANSWER} from "../actions/questions"

export default function questions(state = {} , action){
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return{
                ...state,
                ...action.questions 
            }
        case SAVE_QUESTION:
            return{
                ...state,
                [action.question.id]: action.question 
            }
        case SAVE_ANSWER:
            const optionOneVotes = state[action.answer.qid].optionOne.votes
            const optionTwoVotes = state[action.answer.qid].optionTwo.votes
            const authedUser = action.answer.authedUser
            const answer = action.answer.answer
            const qid = action.answer.qid
            return{
                ...state,
                [qid]: {
                    ...state[qid],
                    optionOne:
                    {
                        ...state[qid].optionOne,
                        votes: [...optionOneVotes.filter(id => id !== authedUser), ... answer === 'optionOne' ? [authedUser] : [] ]
                    },
                    optionTwo:
                    {
                        ...state[qid].optionTwo,
                        votes: [...optionTwoVotes.filter(id => id !== authedUser), ... answer === 'optionTwo' ? [authedUser] : [] ]
                    } 
                }

            }
        default:
            return state
    }
}