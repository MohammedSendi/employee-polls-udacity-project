import {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Home from './Home'
import NewQuestion from './NewQuestion'
import Question from './Question'
import LoadingBar from 'react-redux-loading-bar'
import Leaderboard from './Leaderboard'
const App = (props) => {

  useEffect (() => {
    props.dispatch(handleInitialData());
  }, [])

  return (
  <div>
    <LoadingBar/>
    {props.loading === true? "loading" : <Leaderboard/>}
  </div>
);
}

const mapStateToProps = ({authedUser}) => (
  {
    loading: authedUser === null,
  }
)

export default connect(mapStateToProps)(App);
