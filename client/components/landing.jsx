import React from 'react';
import { Button } from 'semantic-ui-react';

const Landing = (props) => (
  <div>
  <Button
    color='orange'
    size='massive'
    onClick={props.handleLogin}
  >
    Login
  </Button>
    <h2>landing</h2>
    <a href="/auth/google">Sign In with Google</a>

  </div>
)

export default Landing;