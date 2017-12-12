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
        <Header isLoggedIn={this.props.isLoggedIn} /*logOut={handleLogout} */ />
        <Dashboard />
        </div>
    )
  }
}

// service functions that dispatch action upon server response
const handleLogin = () => {
  return (dispatch) => {
    let request = axios.get('/logged');

    return request.then(
      response => response.data ? dispatch(logIn()) : console.log('not logged in'))
      .catch(err => console.log(err));
  };
};

/*
const handleLogout = () => {
  console.log('handleLogout called');
  return (dispatch) => {
    let request = axios.get('/logout');

    return request.then(
      response => response.data ? dispatch(logOut()) : console.log('not logged out'))
      .catch(err => console.log(err));
  };
}
*/

// action creator functions
const logIn = () => {
  console.log('logIn action called')
  return {
    type: 'LOG_IN',
    payload: true,
  };
}

/*
const logOut = () => {
  console.log('logOut action called')
  return {
    type: 'LOG_OUT',
    payload: false,
  };
}
*/

const mapStateToProps = (state) => {
  console.log('state in map props', state)
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
  };
}

export default connect(mapStateToProps, { logIn, handleLogin })(App);



