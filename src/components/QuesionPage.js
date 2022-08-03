import { connect } from "react-redux";
import {handleSaveAnswer} from '../actions/questions'

const QuestionPage = (props) => {

    const handleClick = (event) => {
        //dispatch answer
        console.log(props.question.id)
        const answer = { 
            authedUser: props.authedUser,
            qid: props.question.id,
            answer: event.target.value
        }
        props.dispatch(handleSaveAnswer(answer))
        
        //return to home
    }

    return (
        <div>
            <h1>Poll by <span>{props.author}</span></h1>
            <h1>Would You Rather</h1>
            <div>
                <h4>{props.question.optionOne.text}</h4>
                <button value={'optionOne'} onClick={handleClick} disabled={props.question.optionOne.votes.includes(props.authedUser)}>Click</button>
            </div>
            <div>
                <h4>{props.question.optionTwo.text}</h4>
                <button value={'optionTwo'} onClick={handleClick} disabled={props.question.optionTwo.votes.includes(props.authedUser)}>Click</button>
            </div>
        </div>
    )
}

const mapStateToProps = ({authedUser, users, questions}, {id}) => {
     const question = questions[id];
     
     return {
        authedUser,
        question,
        author: users[question.author].name,
     }
}

export default connect(mapStateToProps)(QuestionPage)