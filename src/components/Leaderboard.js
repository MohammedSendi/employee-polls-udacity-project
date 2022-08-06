import { connect } from "react-redux";
import { useState, useEffect } from "react";

const Leaderboard = (props) => {

    return (
        <div>
            <h1>Leaderboard</h1>
            <ul>
            {
                
                props.users.map(user => (
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

    let usersWithPoints = []
    
    Object.keys(users).forEach(user => {
        let answers = Object.keys(users[user].answers).length
        let questions = users[user].questions.length
        let total = answers + questions

        usersWithPoints = Object.values( {
            ...usersWithPoints,
            [user]: { 
                ...users[user],
                total 
            }
        }).sort((a, b) => b.total - a.total)
    })


     return {
        authedUser,
        users: usersWithPoints,
     }
}

export default connect(mapStateToProps)(Leaderboard)