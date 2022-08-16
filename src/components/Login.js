import { useState } from "react";
import { connect } from "react-redux";
import { handleLogin } from '../actions/authedUser'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const Login = (props) => {

    const [error, setError] = useState("")
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const submitEnabled = props.loading

    const handleTextChange = (event) => {
        event.preventDefault()
        const val = event.target.value;
        event.target.name === "user" ? setUser(val) :  setPass(val)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(user === "" || pass === ""){
            setError("please enter user name and password")
            return
        }
        setError("")
        props.dispatch(handleLogin(user, pass))
    }

    return (
    <form onSubmit={handleSubmit}>
            <br/>
            <Box sx={{ maxWidth: '100%',}} textAlign='center' >
                <Typography variant="h4" component="h5" color="text.primary" textAlign='center'>
                    Employee Polls
                </Typography>
                <Divider />
                <Typography variant="h5" component="h6" color="text.secondary" textAlign='center'>
                    Log In
                </Typography>
                <br/>
                {error !== "" && <Alert data-testid="error" severity="error">{error}</Alert>}
                <Typography color="text.secondary" textAlign='center'>
                    User
                </Typography>
                <TextField fullWidth label="User" name="user" id="user" type={'text'} onChange={handleTextChange}/>
                <br/><br/>
                <Typography color="text.secondary" textAlign='center'>
                    Password
                </Typography>
                <TextField fullWidth label="password" name="password" id="password" type={'password'} onChange={handleTextChange} />
                <br/><br/>
                <Button data-testid='submit-button' type="submit" disabled={submitEnabled} variant="contained">Log In</Button>
            </Box>
        </form>
    )
}

const mapStateToProps = ({loadingBar}) => {
     
     return {
        loading: loadingBar.default === 1,
     }
}

export default connect(mapStateToProps)(Login)