import { useState } from "react";
import { connect } from "react-redux";
import { handleLogin } from '../actions/authedUser'

const Login = (props) => {

    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const submitEnabled = props.loading || user === "" || pass === ""

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
            <input name="password" type={'password'} placeholder="Password" onChange={handleTextChange}/>
            <button type="submit" disabled={submitEnabled}>Submit</button>
        </form>
    </div>
    )
}

const mapStateToProps = ({loadingBar}) => {
     
     return {
        loading: loadingBar.default === 1,
     }
}

export default connect(mapStateToProps)(Login)