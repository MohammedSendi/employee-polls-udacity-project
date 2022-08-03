import { useState } from "react";
import { connect } from "react-redux";
import { handleLogin } from '../actions/authedUser'

const Login = (props) => {

    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")

    const handleTextChange = (event) => {
        event.preventDefault()
        const val = event.target.value;
        event.target.name === "user" ? setUser(val) :  setPass(val)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.dispatch(handleLogin(user, pass))
        //setUser("")
        //setPass("")
    }

    return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input name="user" type={'text'} placeholder="User" onChange={handleTextChange}/>
            <input name="password" type={'text'} placeholder="Password" onChange={handleTextChange}/>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}

const mapStateToProps = ({authedUser, users}) => {
     
     return {
        authedUser,
     }
}

export default connect(mapStateToProps)(Login)