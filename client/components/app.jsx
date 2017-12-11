import React from 'react';
import { Button } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Landing from './landing.jsx'
import Dashboard from './dashboard.jsx'
import { Header } from './header.jsx';
import { connect } from 'react-redux';
import axios from 'axios';
import thunk from 'redux-thunk'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  // service function that dispatches action
  handleLogin () {
    console.log('handlelogin called')
    return (dispatch) => {
      console.log('dispatch: ', dispatch)
    const request =  axios.get('/logged');

    return request.then(
      response => {
        console.log('response from server', response)
        dispatch(logIn())
      })
      .catch(err => console.log(err));
    }
  }

  handleLogout () {
    logOut();
  }

  componentDidMount() {
    console.log('component Did Mount')
    this.handleLogin();
  }

  render() {
    return (
      !this.props.isLoggedIn ?
      <div>
        <Header isLoggedIn={this.props.isLoggedIn} logIn={this.handleLogin}  />
        <Landing />
      </div>
      :
      <div>
        <Header isLoggedIn={this.props.isLoggedIn} logOut={this.handleLogout}/>
        <Dashboard />
        </div>
    )
  }
}



const logIn = () => {
  console.log('logIn action called')
  return {
    type: 'LOG_IN',
    payload: true,
  };
}

const logOut = () => {
  console.log('logOut action called')
  return {
    type: 'LOG_OUT',
    payload: false,
  };
}

const mapStateToProps = (state) => {
  console.log('state in map props', state)
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
  };
}


// countUp is an action creator
// const mapDispatchToProps = (dispatch) => {
//  return bindActionCreators( { countUp }, dispatch)
// }

export default connect(mapStateToProps, { logIn, logOut })(App);

// refactor reducer to set initial state object
// return { ...state, objVariable e.g. clicks }
// define constants to use in actions instead of strings

// getAllApplications is a service that calls an action


