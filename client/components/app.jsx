import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { Sidebar, Segment, Button, Menu, Icon } from 'semantic-ui-react';
import Landing from './landing.jsx';
import { Head } from './header.jsx';
import Dashboard from './dashboard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  componentDidMount() {
    //check whether authenticated
    this.props.handleLogin();
  }

  render() {
    const { visible } = this.state;
    return !this.props.isLoggedIn ? (
      <div>
        <Head isLoggedIn={this.props.isLoggedIn} logIn={handleLogin} />
        <Landing />
      </div>
    ) : (
      <div>
        <Head isLoggedIn={this.props.isLoggedIn} /*logOut={handleLogout} */ />
        <div>
          <Button onClick={this.toggleVisibility} icon="bars" secondary>
          </Button>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="slide out"
              width="thin"
              visible={visible}
              icon="labeled"
              vertical
              inverted
            >
              <Menu.Item name="Dashboard">
                <Icon name="rocket" />
                Dashboard
              </Menu.Item>
              <Menu.Item name="App Materials">
                <Icon name="folder" />
                App Materials
              </Menu.Item>
              <Menu.Item name="Metrics">
                <Icon name="line graph" />
                Metrics
              </Menu.Item>
              <Menu.Item name="Profile">
                <Icon name="user" />
                Profile
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                <Dashboard />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </div>
    );
  }
}

// service functions that dispatch action upon server response
const handleLogin = () => {
  return dispatch => {
    let request = axios.get('/logged');

    return request
      .then(
        response =>
          response.data ? dispatch(logIn()) : console.log('not logged in')
      )
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
  console.log('logIn action called');
  return {
    type: 'LOG_IN',
    payload: true,
  };
};

/*
const logOut = () => {
  console.log('logOut action called')
  return {
    type: 'LOG_OUT',
    payload: false,
  };
}
*/

const mapStateToProps = state => {
  console.log('state in map props', state);
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps, { logIn, handleLogin })(App);
