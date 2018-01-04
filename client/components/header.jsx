import React, { Component } from 'react';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { Button, Segment, Header, Icon } from 'semantic-ui-react';
import GooglePicker from './react-google-picker.jsx';
import ApplicationModal from '../containers/applicationModal.jsx';

class Head extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.props.handleLogout();
  }

  render() {
    return this.props.isLoggedIn ? (
      <div>
        <Segment color="black" basic clearing className="headerLine">
          <Button inverted floated="right" className="logoutButton" onClick={event => this.onLogout()}>
            Log out
          </Button>
          <Header as="h1" floated="left" inverted>
            <Icon name="certificate" />
            Fledge
          </Header>
          <ApplicationModal
            application=""
            buttonLabel="Add an application"
            className="applicationButton inverted olive"
            application={{ _id: undefined }}
            newApp={true}
          />
        </Segment>
      </div>
    ) : (
      <div>
        <Segment color="black" basic clearing>
          <Button
            floated="left"
            href="/auth/google"
            content="Sign in with Google"
          />
        </Segment>
      </div>
    );
  }
}

const logOut = () => {
  return {
    type: 'LOG_OUT',
    payload: false,
  };
};

const handleLogout = () => {
  return (dispatch) => {
    const request = axios.get('/logout');

    return request
      .then(response => dispatch(logOut()))
      .catch(err => console.log(err));
  };
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps, { handleLogout })(Head);
