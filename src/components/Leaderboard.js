import { connect } from "react-redux";
import { useState, useEffect } from "react";

const Leaderboard = (props) => {

    const [userScore, setUserScore] = useState([])

    useEffect(() => {
        setUserScore([])
        Object.keys(props.users).forEach(user => {
            let answers = Object.keys(props.users[user].answers).length
            let questions = props.users[user].questions.length
            let total = answers + questions

            setUserScore((userScore) => Object.values({
                ...userScore,
                [user]: {
                    ...props.users[user],
                    total 
                }
            }).sort((a, b) => b.total - a.total))
        })
    }, [])
    

    console.log(userScore)
    return (
        <div>
            <h1>Leaderboard</h1>
            <ul>
            {
                userScore.map(user => (
                    <li key={user.id}>
                        <div>
                            <p>{user.name}</p>
                            <p>answered {Object.keys(user.answers).length}</p>
                            <p>created {user.questions.length}</p>
                        </div>
                    </li>
                ))
            }
            </ul>
        </div>
    )
}

const mapStateToProps = ({authedUser, users}) => {
     
     return {
        authedUser,
        users,
     }
}

export default connect(mapStateToProps)(Leaderboard)