import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import ApplicationModal from '../containers/applicationModal.jsx';
import { connect } from 'react-redux';
import { showModal } from '../actions/index.jsx';

let ApplicationChip = ({ application, dispatch }) => {

  return (
    <div>
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src='' />
          <Card.Header>
            {application.company}
          </Card.Header>
          <Card.Meta>
            {application.position}
          </Card.Meta>
          <Card.Description>
            Some words we might want to add... <strong>at some point</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            {/* button click dispatches action to show modal */}
            <Button basic color='blue' onClick={() => showModal(<ApplicationModal application={application} /> )}
            >Expand</Button>
            <Button basic color='red'>Delete</Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};


export default ApplicationChip;