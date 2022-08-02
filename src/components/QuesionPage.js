import { connect } from "react-redux";

const QuestionPage = (props) => {
    console.log(props)
    return (
        <div>
            <h1>Poll by <span>{props.author}</span></h1>
            <h1>Would You Rather</h1>
            <div>
                <h4>{props.question.optionOne.text}</h4>
                <button>Click</button>
            </div>
            <div>
                <h4>{props.question.optionTwo.text}</h4>
                <button>Click</button>
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