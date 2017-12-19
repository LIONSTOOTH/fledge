import React from 'react';
<<<<<<< HEAD
import { Button, Segment, Header, Icon } from 'semantic-ui-react';
=======
import { Button, Segment } from 'semantic-ui-react';
import GooglePicker from './react-google-picker.jsx';

>>>>>>> Added Google drive upload via google picker

export const Head = ({ isLoggedIn, toggleVisibility }) => {
  return isLoggedIn ? (
    <div>
      <Segment size="large" color="black" clearing>
        <Header as="h1" textAlign="left">
          <Icon name="certificate" />
          Fledge
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
      <GooglePicker clientId={'108994268957-a7mgrj68ai43tdd89ivrsmuk4jcnhi0i.apps.googleusercontent.com'}
              developerKey={'AIzaSyDdoVy5ZiRcUdnK_y171ocM4385IWaRbCg'}
              scope={['https://www.googleapis.com/auth/drive']}
              onChange={data => console.log('on change:', data)}
              multiselect={true}
              navHidden={true}
              authImmediate={false}
              mimeTypes={[]}
              viewId={'DOCS'}

      >

</GooglePicker>
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
