import {_saveQuestion, _saveQuestionAnswer} from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {addQuestion , addAnswer} from './users'

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_QUESTION = "SAVE_QUESTION"
export const SAVE_ANSWER = "SAVE_ANSWER"

export function receiveQuestions(questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function saveQuestion(question){
    return {
        type: SAVE_QUESTION,
        question,
    }
}

function saveAnswer(answer){
    return {
        type: SAVE_ANSWER,
        answer
    }
}

export function handleSaveQuestion(question){
    return (dispatch) => {
        dispatch(showLoading());
        return _saveQuestion(question)
        .then((question) => {
            dispatch(saveQuestion(question))
            dispatch(addQuestion(question.author, question.id))
        })
        .then(() => dispatch(hideLoading()))
    }
}


export function handleSaveAnswer(answer){
    return (dispatch) => {
        dispatch(showLoading());
        return _saveQuestionAnswer(answer)
        .then(dispatch(saveAnswer(answer)))
        .then(dispatch(addAnswer(answer)))
        .then(() => dispatch(hideLoading()))
    }
}