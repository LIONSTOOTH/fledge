import React from 'react';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { Button, Segment, Header } from 'semantic-ui-react';
import * as action from '../actions';
import ApplicationModal from './applicationModal.jsx';
import GooglePicker from '../components/react-google-picker.jsx';

const style = {
  image: {
    height: '53px',
    width: '53px',
    margin: '0',
    float: 'left',
    position: 'relative',
    bottom: '9px',
  },
  head: {
    paddingTop: 16,
  },
  logInHead: {
    padding: 16,
  }
};

class Head extends React.Component {
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
        <Segment
          color="black"
          basic
          clearing
          className="headerLine"
          style={style.head}
        >
          <Button
            basic
            compact
            floated="right"
            className="logoutButton"
            onClick={() => this.onLogout()}
          >
            Log out
          </Button>
          <Header
            as="h1"
            floated="left"
            inverted
          >
            <img
              src="http://i68.tinypic.com/1z2m06f.png"
              alt=""
              style={style.image}
            />
            Fledge
          </Header>
          <ApplicationModal
            buttonLabel="Add Application"
            className="applicationButton inverted"
            application={{ _id: undefined }}
            newApp={true}
          />
        </Segment>
      </div>
    ) : (
      <div>
        <Segment
          color="black"
          style={style.logInHead}
          basic
          clearing
        >
          <Button
            className="ui google login button inverted"
            floated="left"
            href="/auth/google"
            content="Sign in with Google"
          />
        </Segment>
      </div>
    );
  }
}

const handleLogout = () => {
  return (dispatch) => {
    const request = axios.get('/logout');

    return request
      .then(response => dispatch(action.logOut()))
      .catch(err => console.log(err));
  };
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps, { handleLogout })(Head);
