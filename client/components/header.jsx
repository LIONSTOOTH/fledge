import React from 'react';
import { Button } from 'semantic-ui-react';

export const Header = ({ isLoggedIn, logOut }) => {

  return (
    isLoggedIn ?
    <div style={{ border: '2px solid black' }}>
      <Button color='orange' onClick={logOut}>
        Log out
      </Button>
      </div>
    :
    <div style={{ border: '2px solid black' }}>
      <Button color='orange'>
        <a href="/auth/google">Sign In with Google</a>
      </Button>
    </div>
  );
}
