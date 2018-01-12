import React from 'react';
import GooglePicker from './react-google-picker.jsx';

const Materials = props => (
  <div id="drive">
    <h1>Upload Application Materials</h1>
    <GooglePicker
      clientId={process.env.GOOGLE_CLIENT_ID}
      developerKey={process.env.GOOGLE_API_KEY}
      scope={['https://www.googleapis.com/auth/drive']}
      multiselect={true}
      navHidden={true}
      authImmediate={false}
      mimeTypes={[]}
      viewId={'DOCS'}
    />
  </div>
);

export default Materials;
