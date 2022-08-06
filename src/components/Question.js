import { connect } from "react-redux";
import { formatDate } from "../utils/helper";
import {useNavigate, Link} from 'react-router-dom'

const Question = (props) => {

    const navigate = useNavigate()

    return (
        <div>
            <h1>{props.author}</h1>
            <p>{formatDate(props.question.timestamp)}</p>
            <Link to={`/poll/${props.question.id}`}><button>Show</button> </Link>
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