import {useEffect, Fragment} from 'react'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Home from './Home'
import NewQuestion from './NewQuestion'
import LoadingBar from 'react-redux-loading-bar'
import Leaderboard from './Leaderboard'
import QuesionPage from './QuesionPage'
import Nav from './Nav'
import Login from './Login'
import {Routes, Route} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';


const theme = createTheme({
  palette: {
    mode: 'dark',

    
  },
});

const App = (props) => {

  useEffect (() => {
    props.dispatch(handleInitialData());
  }, [])

  return (
  <ThemeProvider theme={theme}>
          <CssBaseline />

    <Container>
      <Fragment>
        <LoadingBar/>
        {props.logged === true? <Login/> : (
          <div>
            <Nav/>
            <Routes>
              <Route path='/' exact element={<Home/>}/>
              <Route path='/leaderboard' element={<Leaderboard/>}/>
              <Route path='/add' element={<NewQuestion/>}/>
              <Route path='/questions/:id' element={<QuesionPage/>}/>
            </Routes>
          </div>
        )}
      </Fragment>
    </Container>
  </ThemeProvider>

);
}

const mapStateToProps = ({authedUser}) => (
  {
    logged: authedUser === null,
  }
)

export default connect(mapStateToProps)(App);
