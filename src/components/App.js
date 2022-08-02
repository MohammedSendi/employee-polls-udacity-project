import {useEffect} from 'react'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Home from './Home'
import Question from './Question'

const App = (props) => {

  useEffect (() => {
    props.dispatch(handleInitialData());
  }, [])

  return (
  <div>
    {props.loading === true? "loading" : <Home/>}
  </div>
);
}

const mapStateToProps = ({authedUser}) => (
  {
    loading: authedUser === null,
  }
)

export default connect(mapStateToProps)(App);
