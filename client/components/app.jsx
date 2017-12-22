import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { Sidebar, Segment, Button, Menu, Icon } from 'semantic-ui-react';
import Landing from './landing.jsx';
import Head from './header.jsx';
import Dashboard from './dashboard.jsx';
import Materials from './materials.jsx';
import Metrics from './metrics.jsx';
import Contacts from './contacts.jsx';
import Reminders from './reminders.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      pusher: 1,
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
    let view = null;
    if (this.state.pusher === 1) {
      view = <Dashboard />;
    } else if (this.state.pusher === 2) {
      view = <Materials />;
    } else if (this.state.pusher === 3) {
      view = <Metrics />;
    } else if (this.state.pusher === 4) {
      view = <Contacts />;
    } else if (this.state.pusher === 5) {
      view = <Reminders />;
    }

    return !this.props.isLoggedIn ? (
      <div>
        <Head isLoggedIn={this.props.isLoggedIn} logIn={handleLogin} />
        <Landing />
      </div>
    ) : (
      <div>
        <Head isLoggedIn={this.props.isLoggedIn} /*logOut={handleLogout} */ />
        <div>
          <br />
          <Button onClick={this.toggleVisibility} secondary>
            <i class="sidebar icon" />
            Menu
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
              <Menu.Item
                name="Dashboard"
                onClick={event => this.setState({ pusher: 1 })}
              >
                <Icon name="rocket" />
                Dashboard
              </Menu.Item>
              <Menu.Item
                name="App Materials"
                onClick={event => this.setState({ pusher: 2 })}
              >
                <Icon name="folder" />
                App Materials
              </Menu.Item>
              <Menu.Item
                name="Metrics"
                onClick={event => this.setState({ pusher: 3 })}
              >
                <Icon name="line graph" />
                Metrics
              </Menu.Item>
              <Menu.Item
                name="Contacts"
                onClick={event => this.setState({ pusher: 4 })}
              >
                <Icon name="address card outline" />
                Contacts
              </Menu.Item>
              <Menu.Item
                name="Reminders"
                onClick={event => this.setState({ pusher: 5 })}
              >
                <Icon name="bullhorn" />
                Reminders
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment centered basic>{view}</Segment>
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

// action creator functions
const logIn = () => {
  console.log('logIn action called');
  return {
    type: 'LOG_IN',
    payload: true,
  };
};

const mapStateToProps = state => {
  console.log('state in map props', state);
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps, { logIn, handleLogin })(App);
