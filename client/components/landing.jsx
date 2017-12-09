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
    <div class="g-signin2" data-onsuccess="onSignIn"></div>

  </div>
)

export default Landing;