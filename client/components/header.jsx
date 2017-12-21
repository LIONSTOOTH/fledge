import React from 'react';
import axios from 'axios';
import { Button, Segment, Header, Icon } from 'semantic-ui-react';
import GooglePicker from './react-google-picker.jsx';

function logOut() {
  axios
    .get('/logout')
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}

export const Head = ({ isLoggedIn, toggleVisibility }) => {
  return isLoggedIn ? (
    <div>
      <Segment size="large" color="black" clearing>
        <Header as="h1" textAlign="left">
          <Icon name="certificate" />
          Fledge
        </Header>
        <Button color="orange" floated="right" onClick={(event) => logOut()}>
          <a style={{ color: 'white' }}>
            Log out
          </a>
        </Button>
      </Segment>
    </div>
  ) : (
    <div>
      <Segment size="big" color="black" clearing>
        <Header as="h1" textAlign="center">
          <i class="certificate loading icon"></i>
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
};
