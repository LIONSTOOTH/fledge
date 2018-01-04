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
          <Button basic compact floated="right" className="logoutButton" onClick={event => this.onLogout()}>
            Log out
          </Button>
          <Header as="h1" floated="left" inverted>
            <img src="http://i68.tinypic.com/1z2m06f.png" style={{height: '53px', width: '53px', margin: '0', float: 'left', position: 'relative', bottom: '9px'}}></img>
            Fledge
          </Header>
          <ApplicationModal
            application=""
            buttonLabel="Add Application"
            className="applicationButton inverted"
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
