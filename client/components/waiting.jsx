import React from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

const Waiting = () => {
  return (
    <div>
      <Segment>
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </Segment>
    </div>
  );
};

export default Waiting;
