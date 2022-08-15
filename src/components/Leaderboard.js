import { connect } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Leaderboard = (props) => {

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{backgroundColor:'#525252', color: 'white',}}>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell align="center">Answered</TableCell>
              <TableCell align="center">Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">  
                    <Grid container spacing={2}>
                        <Grid item>
                            <Avatar alt={user.name} src={user.avatarURL ? user.avatarURL : "/"} />
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography >
                                        {user.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {user.id}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>                  
                </TableCell>
                <TableCell align="center">{Object.keys(user.answers).length}</TableCell>
                <TableCell align="center">{user.questions.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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