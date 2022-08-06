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
        const answer = { 
            authedUser: props.authedUser,
            qid: props.id,
            answer: event.target.value
        }
        props.dispatch(handleSaveAnswer(answer))

    }

    return (
        <div>
            {
                props.error ? (
                    <div>
                        <h1>{props.error}</h1>
                        <h3>Page not Found</h3>
                    </div>
                ) : (
                <div>
                    <h1>Poll by <span>{props.author}</span></h1>
                    <h1>Would You Rather</h1>
                    <div>
                        <h4>{props.question.optionOne.text}</h4>
                        <button value={'optionOne'} onClick={handleClick} disabled={props.optionOne}>Click</button>
                        {props.answered && (
                            <div>
                                <p>{props.optionOneVotes}</p>
                                <p>{props.optionOnePercentage}%</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <h4>{props.question.optionTwo.text}</h4>
                        <button value={'optionTwo'} onClick={handleClick} disabled={props.optionTwo}>Click</button>
                        {props.answered && (
                            <div>
                                <p>{props.optionTwoVotes}</p>
                                <p>{props.optionTwoPercentage}%</p>
                            </div>
                        )}
                    </div>
                </div>) 
            }
        </div>
    )
}

const mapStateToProps = ({authedUser, users, questions}, props) => {
    const { id } = props.router.params;
    const question = questions[id];
    if(!question) return {error : '404'}
    const optionOneVotes = question.optionOne.votes.length
    const optionTwoVotes = question.optionTwo.votes.length
    const totalVotes = optionOneVotes + optionTwoVotes;
    const optionOnePercentage = Math.round((optionOneVotes * 100) / totalVotes);
    const optionTwoPercentage = Math.round((optionTwoVotes * 100) / totalVotes);
    const optionOne = question.optionOne.votes.includes(authedUser)
    const optionTwo = question.optionTwo.votes.includes(authedUser)
    const answered = optionOne || optionTwo

    return {
        authedUser,
        question,
        author: users[question.author].name,
        id,
        ...props.router,
        optionOne,
        optionTwo,
        optionOneVotes,
        optionTwoVotes,
        optionOnePercentage,
        optionTwoPercentage,
        answered
    }
}

export default withRouter(connect(mapStateToProps)(QuestionPage))