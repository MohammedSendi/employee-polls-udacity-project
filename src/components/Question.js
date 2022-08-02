import { connect } from "react-redux";
import { formatDate } from "../utils/helper";

const Question = (props) => {
    console.log(props)
    return (
        <div>
            <h1>{props.author}</h1>
            <p>{formatDate(props.question.timestamp)}</p>
            <button>Show</button>
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

export default connect(mapStateToProps)(Question)