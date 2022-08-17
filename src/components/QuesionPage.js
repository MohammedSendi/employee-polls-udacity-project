import { connect } from "react-redux";
import {handleSaveAnswer} from '../actions/questions'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea } from '@mui/material';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

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
            answer: event.currentTarget.value
        }
        props.dispatch(handleSaveAnswer(answer))

    }

    return (
        props.error ? (
            <div>
                <h1 data-testid='error'>{props.error}</h1>
                <h3>Page not Found</h3>
            </div>
            ) : (
            <Box sx={{ flexGrow: 1 }} >
                <br/>
                <Grid align='center'>
                <Typography data-testid='author' variant="h4" component="h5" color="text.primary" textAlign='center'>
                    Poll by {props.author.name}
                </Typography>
                <br/>
                <Avatar 
                    alt={props.author.name}
                    src={props.author.avatarURL ? props.author.avatarURL : "/"}
                    sx={{ width: 400, height: 400 }}
                    align='center'
                />
                <br/>
                <Typography variant="h4" component="h5" color="text.primary" textAlign='center'>
                    Would You Rather
                </Typography>
                <br/>
                </Grid>
                    <Grid alignItems="center" justifyContent="center" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={6} >
                            <Button variant="outlined" value={'optionOne'} onClick={handleClick} {...(props.optionOne? {color : "success", variant: "contained"} : {})}>
                                <Typography data-testid='option-one'  gutterBottom variant="h5" component="div" color="text.primary" textAlign='center'>
                                    {props.question.optionOne.text}
                                </Typography>
                            </Button>
                            {
                                props.answered && ( <>
                                    <Typography color="text.primary" textAlign='center'>
                                            number of votes: {props.optionOneVotes}
                                    </Typography>
                                    <Typography color="text.primary" textAlign='center'>
                                            percentage: {props.optionOnePercentage}%
                                    </Typography>
                                </>)
                            }
                        </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" value={'optionTwo'} onClick={handleClick} {...(props.optionTwo? {color : "success", variant: "contained"} : {})}>
                            <Typography data-testid='option-two'  gutterBottom variant="h5" component="div" color="text.primary" textAlign='center'>
                                {props.question.optionTwo.text}
                            </Typography>
                        </Button>
                        {
                            props.answered && ( <>
                                <Typography color="text.primary" textAlign='center'>
                                    number of votes: {props.optionTwoVotes}
                                </Typography>
                                <Typography color="text.primary" textAlign='center'>
                                    percentage: {props.optionTwoPercentage}%
                                </Typography>
                            </>)
                        }
                    </Grid>
                </Grid>
            </Box>
            )
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
        author: users[question.author],
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