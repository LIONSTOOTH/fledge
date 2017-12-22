import React, { Component } from 'react';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { Button, Segment, Header, Icon } from 'semantic-ui-react';
import GooglePicker from './react-google-picker.jsx';

class Head extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    console.log('Within onLogout!');
    this.props.handleLogout();
  }

  render() {
    console.log(`PROPS IN HEAD`, this.props);
    return this.props.isLoggedIn ? (
      <div>
        <Segment size="large" color="black" clearing>
          <Header as="h1" textAlign="left">
            <Icon name="certificate" />
            Fledge
          </Header>
          <Button
            color="orange"
            floated="right"
            onClick={event => this.onLogout()}
          >
            <a style={{ color: 'white' }}>Log out</a>
          </Button>
        </Segment>
      </div>
    ) : (
      <div>
        <Segment size="big" color="black" clearing>
          <Header as="h1" textAlign="center">
            <Icon name="certificate" />
            <Header.Content>Fledge</Header.Content>
          </Header>
          <Button color="orange">
            <a href="/auth/google" style={{ color: 'white' }}>
              Sign in with Google
            </a>
          </Button>
        </Segment>
      </div>
    );
  }
}

const logOut = () => {
  console.log('logOut action called');
  return {
    type: 'LOG_OUT',
    payload: false,
  };
};

const handleLogout = () => {
  console.log('handleLogout called');
  return dispatch => {
    const request = axios.get('/logout');

    return request
      .then(response => dispatch(logOut()))
      .catch(err => console.log(err));
  };
};

const mapStateToProps = state => {
  console.log(`STATE IN HEADER MtP`, state);
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps, { handleLogout })(Head);
