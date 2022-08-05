import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authedUser";

const Nav = (props) => {

    const handleLogout = () => {
        props.dispatch(logoutUser())
    }

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/leaderboard">Leaderboard</Link></li>
                <li><Link to="/new">New</Link></li>
            </ul>
            <button onClick={handleLogout}>logout</button>
        </nav>
    )
}

const mapStateToProps = ({authedUser}) => {
    
    return {
        authedUser,
    }
}
export default connect(mapStateToProps)(Nav)
