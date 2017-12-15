import React from 'react';
import { Button, Segment, Header, Icon } from 'semantic-ui-react';

const HeaderExamplePlugIcon = () => (
  <Header as="h2">
    <Icon name="plug" />
    <Header.Content>Uptime Guarantee</Header.Content>
  </Header>
);

export const Head = ({ isLoggedIn, toggleVisibility }) => {
  console.log('HEADER PROPS:', toggleVisibility);
  return isLoggedIn ? (
    <div>
      <Segment size="big" color="black" clearing>
        <Header as="h1" textAlign="center">
          <Icon name="certificate" />
          <Header.Content>Fledge</Header.Content>
        </Header>
        <Button color="orange" floated="right">
          <a
            href="https://mail.google.com/mail/u/0/?logout&hl=en"
            style={{ color: 'white' }}
          >
            Log out
          </a>
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
};
