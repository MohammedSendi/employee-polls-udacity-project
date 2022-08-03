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

const App = (props) => {

  useEffect (() => {
    props.dispatch(handleInitialData());
  }, [])

  return (
  <Fragment>
    <LoadingBar/>
    {props.logged === true? <Login/> : (
      <div>
        <Nav/>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/leaderboard' element={<Leaderboard/>}/>
          <Route path='/new' element={<NewQuestion/>}/>
          <Route path='/poll/:id' element={<QuesionPage/>}/>
        </Routes>
      </div>
    )}
  </Fragment>
);
}

const mapStateToProps = ({authedUser}) => (
  {
    logged: authedUser === null,
  }
)

export default connect(mapStateToProps)(App);
