import React from 'react';
import { Button, Segment } from 'semantic-ui-react';

export const Header = ({ isLoggedIn }) => {

  return (
    isLoggedIn ?
    <div>
      <Segment textAlign="right">
        <Button color="orange">
          <a href="https://mail.google.com/mail/u/0/?logout&hl=en" style={{ color: 'white' }}>Log out</a>
        </Button>
      </Segment>
      </div>
    :
    <div>
      <Segment textAlign="right">
        <Button color='orange'>
          <a href="/auth/google" style={{ color: 'white' }}>Sign in with Google</a>
        </Button>
      </Segment>
    </div>
  );
}
