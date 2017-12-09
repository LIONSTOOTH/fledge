import React from 'react';
import { Button } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Landing from './landing.jsx'
import Dashboard from './dashboard.jsx'
import { connect } from 'react-redux';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
      super(props);
  }

  handleLogin () {
    // should only call authenticateLogin if google auth passes
    this.props.authenticateLogin();
  }

  componentDidMount() {
    let context = this;
    axios.get('/logged').then(function(res){
      if(res.data) {
        context.setState({userLoggedIn: true})
      }
    })


  }

  render() {
    return (
      !this.props.userLoggedIn
        ? <Landing handleLogin={this.handleLogin.bind(this)} />
        : <Dashboard handleLogin={this.handleLogin.bind(this)} />
    )
  }
}

// the action that gets dispatched
const authenticateLogin = () => {
  return {
    type: 'LOGIN',
    payload: getAllApplications().applications,
  }
}


const mapStateToProps= () => {
  return {
    applications: state.applicationReducer.applications
  };
}

export default connect(mapStateToProps, { l })(App);


