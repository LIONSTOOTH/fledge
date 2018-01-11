import React from 'react';
import GooglePicker from './react-google-picker.jsx';

const Materials = props => (
  <div id="drive">
    <h1>Upload Application Materials</h1>
    <GooglePicker
      clientId={
        '108994268957-a7mgrj68ai43tdd89ivrsmuk4jcnhi0i.apps.googleusercontent.com'
      }
      developerKey={'AIzaSyDdoVy5ZiRcUdnK_y171ocM4385IWaRbCg'}
      scope={['https://www.googleapis.com/auth/drive']}
      onChange={data => console.log('on change:', data)}
      multiselect={true}
      navHidden={true}
      authImmediate={false}
      mimeTypes={[]}
      viewId={'DOCS'}
    />
  </div>
);

export default Materials;
