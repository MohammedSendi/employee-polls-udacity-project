import { connect } from "react-redux";
import Question from "./Question";

const Home = (props) => {
    return <div>
        <h1>Home</h1>
        <h3>Answered</h3>
        <ul>
            {
                props.questions.map((question) => (
                    props.answeredQuestionIds.map(id => {
                        if(question.id === id){
                            return <li key={id}> 
                                <Question id={id}/>
                            </li>
                        }
                    })
                ))
            }
        </ul>
        <h3>Unanswered</h3>
        <ul>
            {
                props.questions.map((question) => (
                    props.unAnsweredQuestionIds.map(id => {
                        if(question.id === id){
                            return <li key={id}> 
                                <Question id={id}/>
                            </li>
                        }
                    })
                ))
            }
        </ul>
    </div>
}

const mapStateToProps = ({users, questions, authedUser}) => ({
    answeredQuestionIds: Object.keys(users[authedUser].answers),
    unAnsweredQuestionIds: Object.keys(questions).filter ((q) => !Object.keys(users[authedUser].answers).includes(q)),
    questions: Object.values(questions).sort((a,b) => b.timestamp - a.timestamp)
})

export default connect(mapStateToProps)(Home);