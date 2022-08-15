import { connect } from "react-redux";
import { formatDate } from "../utils/helper";
import { Link } from 'react-router-dom'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Divider from '@mui/material/Divider';

const Question = (props) => {

    return (
      <Card >
        <CardActionArea>
          <Link to={`/poll/${props.question.id}`} style={{ textDecoration: 'none' }}>
          <CardContent >
            <Typography gutterBottom variant="h5" component="div" color="text.primary" textAlign='center'>
              {props.author}
            </Typography>
            <Divider />
            <Typography variant="body2" color="text.secondary" textAlign='center'>
              {formatDate(props.question.timestamp)}
            </Typography>
          </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    )
}

const mapStateToProps = ({authedUser, users, questions}, {id}) => {
     const question = questions[id];
     
     return {
        authedUser,
        question,
        author: users[question.author].name,
     }
}

export default connect(mapStateToProps)(Question)