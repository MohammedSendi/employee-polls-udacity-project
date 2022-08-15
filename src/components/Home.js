import { connect } from "react-redux";
import Question from "./Question";
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

  const Home = (props) => {
    return (
        <div>
            <br/>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" component="h5" color="text.primary" textAlign='center'>
                    New Questions
                </Typography>
                <Divider />
                <br/>
                <Grid container spacing={{ xs: 4, md: 8 }} columns={{ xs: 2, sm: 4, md: 12 }}>
                    {
                        props.questions.map((question) => (
                            props.unAnsweredQuestionIds.map(id => {
                                if(question.id === id){
                                    return <Grid item xs={2} sm={4} md={4} key={id}>
                                        <Question id={id}/>
                                    </Grid>
                                }
                            })
                        ))
                    }
                </Grid>
                <br/>
                <Divider />
                <br/>
                <Typography variant="h4" component="h5" color="text.primary" textAlign='center'>
                    Done
                </Typography>
                <Divider />
                <br/>
                <Grid container spacing={{ xs: 4, md: 8 }} columns={{ xs: 2, sm: 4, md: 12 }}>
                    {
                        props.questions.map((question) => (
                            props.answeredQuestionIds.map(id => {
                                if(question.id === id){
                                    return <Grid item xs={2} sm={4} md={4} key={id}>
                                        <Question id={id}/>
                                    </Grid>
                                }
                            })
                        ))
                    }
                </Grid>
            </Box>
        </div>

      );

  }

const mapStateToProps = ({users, questions, authedUser}) => ({
    answeredQuestionIds: Object.keys(users[authedUser].answers),
    unAnsweredQuestionIds: Object.keys(questions).filter ((q) => !Object.keys(users[authedUser].answers).includes(q)),
    questions: Object.values(questions).sort((a,b) => b.timestamp - a.timestamp)
})

export default connect(mapStateToProps)(Home);