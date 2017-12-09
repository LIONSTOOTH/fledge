import React from 'react';
import { Button } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Landing from './landing.jsx'
import Dashboard from './dashboard.jsx'
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        userLoggedIn: false
      }
  }

  handleLogin () {
    this.setState({userLoggedIn: !this.state.userLoggedIn});
  }

  render() {
    return (
      !this.state.userLoggedIn
        ? <Landing handleLogin={this.handleLogin.bind(this)} />
        : <Dashboard handleLogin={this.handleLogin.bind(this)} />
    /* <button onClick={this.props.incrementCounterActionCreator}>Hello {this.props.counter}</button> */

    )

    // if (!this.state.userLoggedIn) {
    //   return (
    //       <div>
    //         <Landing handleLogin={this.handleLogin.bind(this)} />
    //       </div>
    //   )
    // } else {
    //   return (
    //     <div>
    //         <Dashboard handleLogin={this.handleLogin.bind(this)} />
    //       </div>
    //   )
    // }
  }
}

// dispatches an action
const incrementCounterActionCreator = () => {
  return {
    type: 'INCREMENT',
    payload: 1,
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counterReducer.counter
  };
}

export default connect(mapStateToProps, { incrementCounterActionCreator })(App)


