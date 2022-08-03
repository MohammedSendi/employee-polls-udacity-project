import {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Home from './Home'
import NewQuestion from './NewQuestion'
import Question from './Question'
import LoadingBar from 'react-redux-loading-bar'
import Leaderboard from './Leaderboard'
import QuesionPage from './QuesionPage'
import Login from './Login'
const App = (props) => {

  useEffect (() => {
    props.dispatch(handleInitialData());
  }, [])

  return (
  <div>
    <LoadingBar/>
    {props.logged === true? <Login/> : <Home/>}
  </div>
);
}

const mapStateToProps = ({authedUser}) => (
  {
    logged: authedUser === null,
  }
)

export default connect(mapStateToProps)(App);
