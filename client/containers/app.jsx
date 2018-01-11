import React from 'react';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';
import * as action from '../actions';
import Contacts from './contacts.jsx';
import Dashboard from '../components/dashboard.jsx';
import Fetti0 from '../components/confetti0.jsx';
import Fetti1 from '../components/confetti1.jsx';
import Head from './header.jsx';
import Landing from '../components/landing.jsx';
import Materials from '../components/materials.jsx';
import Metrics from '../components/metrics.jsx';
import Reminders from './reminders.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      pusher: 1,
      celebrate: false,
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.releaseConfetti = this.releaseConfetti.bind(this);
  }

  componentDidMount() {
    // check whether authenticated
    this.props.handleLogin();
  }

  toggleVisibility() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  releaseConfetti() {
    this.setState({ celebrate: false });
    this.setState({ celebrate: true });
  }

  render() {
    const { visible } = this.state;
    let view = null;
    if (this.state.pusher === 1) {
      view = <Dashboard releaseConfetti={this.releaseConfetti} />;
    } else if (this.state.pusher === 2) {
      view = <Materials />;
    } else if (this.state.pusher === 3) {
      view = <Metrics />;
    } else if (this.state.pusher === 4) {
      view = <Contacts />;
    } else if (this.state.pusher === 5) {
      view = <Reminders />;
    }
    let fetti = null;
    if (this.state.celebrate) {
      fetti = <Fetti1 />;
    } else {
      fetti = <Fetti0 />;
    }

    return !this.props.isLoggedIn ? (
      <div>
        <Head isLoggedIn={this.props.isLoggedIn} logIn={handleLogin} />
        <Landing />
      </div>
    ) : (
      <div>
        {fetti}
        <Head isLoggedIn={this.props.isLoggedIn} />
        <div id="mainBackground">
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              width="thin"
              visible={visible}
              icon="labeled"
              animation="scale down"
              fixed
              vertical
              inverted
            >
              <Menu.Item
                name="Dashboard"
                onClick={() => this.setState({ pusher: 1 })}
              >
                <Icon name="rocket" />
                Dashboard
              </Menu.Item>
              <Menu.Item
                name="App Materials"
                onClick={() => this.setState({ pusher: 2 })}
              >
                <Icon name="folder" />
                App Materials
              </Menu.Item>
              <Menu.Item
                name="Metrics"
                onClick={() => this.setState({ pusher: 3 })}
              >
                <Icon name="line graph" />
                Metrics
              </Menu.Item>
              <Menu.Item
                name="Contacts"
                onClick={() => this.setState({ pusher: 4 })}
              >
                <Icon name="address card outline" />
                Contacts
              </Menu.Item>
              <Menu.Item
                name="Reminders"
                onClick={() => this.setState({ pusher: 5 })}
              >
                <Icon name="bullhorn" />
                Reminders
              </Menu.Item>
            </Sidebar>
            <Segment centered basic style={{ marginLeft: 133 }}>
              {view}
            </Segment>
          </Sidebar.Pushable>
        </div>
      </div>
    );
  }
}

// service function to dispatch action upon server response
const handleLogin = () => {
  return (dispatch) => {
    const request = axios.get('/logged');

    return request
      .then((response) => {
        response.data ? dispatch(action.logIn()) : console.log('Not logged in.');
      })
      .catch(err => console.log(err));
  };
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps, { handleLogin })(App);
