import { connect } from "react-redux";
import Question from "./Question";
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

  const Home = (props) => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div>
            <br/>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} centered>
                        <Tab label="New" value="1" />
                        <Tab label="Answered" value="2" />
                    </TabList>
                    </Box>
                    <TabPanel value="1">
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
                    </TabPanel>
                    <TabPanel value="2">
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
                    </TabPanel>
                </TabContext>
            </Box>

            {/* <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" component="h5" color="text.primary" textAlign='center'>
                    New Questions
                </Typography>
                <Divider />
                <br/>
                
                <br/>
                <Divider />
                <br/>
                <Typography variant="h4" component="h5" color="text.primary" textAlign='center'>
                    Done
                </Typography>
                <Divider />
                <br/>
                
            </Box> */}
        </div>

      );

  }

const mapStateToProps = ({users, questions, authedUser}) => ({
    answeredQuestionIds: Object.keys(users[authedUser].answers),
    unAnsweredQuestionIds: Object.keys(questions).filter ((q) => !Object.keys(users[authedUser].answers).includes(q)),
    questions: Object.values(questions).sort((a,b) => b.timestamp - a.timestamp)
})

export default connect(mapStateToProps)(Home);