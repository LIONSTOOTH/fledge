import React from 'react';
import { Button } from 'semantic-ui-react';

export const Header = ({ isLoggedIn, logIn, logOut }) => {

  return (
    <div style={{ border: '2px solid black' }}>
      <Button color='orange' onClick={isLoggedIn ? logOut : logIn}>
      {isLoggedIn ? 'Log out' : 'Sign In with Google'}
      </Button>
    </div>
  );
}

// dispatches actions to change loggedin state