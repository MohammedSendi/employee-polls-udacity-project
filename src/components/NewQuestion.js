import { connect } from "react-redux";
import {useState} from 'react'
import {formatQuestion} from '../utils/_DATA'
import { handleSaveQuestion } from "../actions/questions";
import questions from "../reducers/questions";
import {useNavigate} from 'react-router-dom'

const NewQuestion = (props) => {

    const navigate = useNavigate()

    const [optionOne, setOptionOne] = useState("")
    const [optionTwo, setOptionTwo] = useState("")

    const handleTextChange = (event) => {
        event.preventDefault()
        const val = event.target.value;
        event.target.name === "option-one" ? setOptionOne(val) :  setOptionTwo(val)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newQuestion = {
            optionOneText: optionOne,
            optionTwoText: optionTwo, 
            author: props.authedUser
        }
        props.dispatch(handleSaveQuestion(newQuestion))

        navigate("/")
        //TODO - return to home page

    }

    return (
        <div>
            <h1>Create Your Own Poll</h1>
            <form onSubmit={handleSubmit}>
                <input name="option-one" type={'text'} placeholder="Option One" onChange={handleTextChange}/>
                <input name="option-two" type={'text'} placeholder="Option Two" onChange={handleTextChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

const mapStateToProps = ({authedUser}) => {
     
     return {
        authedUser,
     }
}

export default connect(mapStateToProps)(NewQuestion)