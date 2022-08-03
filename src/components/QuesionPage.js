import { connect } from "react-redux";
import {handleSaveAnswer} from '../actions/questions'
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
}

const QuestionPage = (props) => {

    const handleClick = (event) => {
        //dispatch answer
        const answer = { 
            authedUser: props.authedUser,
            qid: props.id,
            answer: event.target.value
        }
        props.dispatch(handleSaveAnswer(answer))
        
        //return to home
        props.navigate("/")
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

const mapStateToProps = ({authedUser, users, questions}, props) => {
    const { id } = props.router.params;
    const question = questions[id];

    return {
        authedUser,
        question,
        author: users[question.author].name,
        id,
        ...props.router
    }
}

export default withRouter(connect(mapStateToProps)(QuestionPage))