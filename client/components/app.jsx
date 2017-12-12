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
import thunk from 'redux-thunk';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    console.log('component Did Mount')
    //check whether authenticated
    this.props.handleLogin();
  }

  render() {
    return (
      !this.props.isLoggedIn ?
      <div>
        <Header isLoggedIn={this.props.isLoggedIn} logIn={handleLogin}  />
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

// service functions that dispatches action upon server/api response
const handleLogin = () => {
  return (dispatch) => {
    const request = axios.get('/logged');

    return request.then(
      response => response.data ? dispatch(logIn()) : console.log('not logged in'))
      .catch(err => console.log(err));
    };
};

const handleLogout = () => {
  // make call to server to terminate session
  // dispatch logOut action
  /*

    const request = axios.get('/auth/google');

    return request.then(
      response => {

        response ? console.log('response from server', response) : console.log('empty response from server')
      })
      .catch(err => console.log(err));
    //}
    */
}



//action creators
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


// mapDispatchToProps binds action creators so they can be called here
// const mapDispatchToProps = (dispatch) => {
//  return bindActionCreators( { countUp }, dispatch)
// }

export default connect(mapStateToProps, { logIn, logOut, handleLogin })(App);

// return { ...state, objVariable e.g. clicks }
// define constants to use in actions instead of strings

// getAllApplications is a service that calls an action


