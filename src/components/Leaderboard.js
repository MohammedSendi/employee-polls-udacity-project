import { connect } from "react-redux";

const Leaderboard = (props) => {
    console.log(props)
    return (
        <div>
            <h1>Leaderboard</h1>
            <ul>
            {
                Object.keys(props.users).map(id => (
                    <li key={id}>
                        <div>
                            <p>{props.users[id].name}</p>
                            <p>answered {Object.keys(props.users[id].answers).length}</p>
                            <p>created {props.users[id].questions.length}</p>
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