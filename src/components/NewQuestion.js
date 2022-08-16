import { connect } from "react-redux";
import {useState} from 'react'
import { handleSaveQuestion } from "../actions/questions";
import {useNavigate} from 'react-router-dom'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const NewQuestion = (props) => {

    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [optionOne, setOptionOne] = useState("")
    const [optionTwo, setOptionTwo] = useState("")

    const handleTextChange = (event) => {
        event.preventDefault()
        const val = event.target.value;
        event.target.name === "option-one" ? setOptionOne(val) :  setOptionTwo(val)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if(optionOne === "" || optionTwo === ""){
            setError("Please fill both option before submitting")
            return
        }
        setError("")
        const newQuestion = {
            optionOneText: optionOne,
            optionTwoText: optionTwo, 
            author: props.authedUser
        }
        props.dispatch(handleSaveQuestion(newQuestion))
        navigate("/")

    }

    return (
        <form onSubmit={handleSubmit}>
            <br/>
            <Box sx={{ maxWidth: '100%',}} textAlign='center' >
                <Typography variant="h4" component="h5" color="text.primary" textAlign='center'>
                    Would You Rather
                </Typography>
                <Divider />
                <Typography variant="h5" component="h6" color="text.secondary" textAlign='center'>
                    Create Your Own Poll
                </Typography>
                <br/>
                {error !== "" && <Alert data-testid="error" severity="error">{error}</Alert>}
                <Typography color="text.secondary" textAlign='center'>
                    First Option
                </Typography>
                <TextField fullWidth label="Option One" name="option-one" type={'text'} onChange={handleTextChange}/>
                <br/><br/>
                <Typography color="text.secondary" textAlign='center'>
                    Second Option
                </Typography>
                <TextField fullWidth label="Option One" name="option-two" type={'text'} placeholder="Option Two" onChange={handleTextChange} />
                <br/><br/>
                <Button data-testid='submit-button' type="submit" variant="contained">Submit</Button>
            </Box>
        </form>
    )
}

const mapStateToProps = ({authedUser}) => {
     
     return {
        authedUser,
     }
}

export default connect(mapStateToProps)(NewQuestion)