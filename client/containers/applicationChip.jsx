import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
// import { connect } from 'react-redux';
// need to create dispatch action
// import { addApplication } from '../actions';

export const ApplicationChip = ({ position, company, dispatch }) => {
  console.log('in chip',position);
  return (
    <div>
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src='' />
          <Card.Header>
            {company}
          </Card.Header>
          <Card.Meta>
            {position}
          </Card.Meta>
          <Card.Description>
            Some words we might want to add... <strong>at some point</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='blue'>Expand</Button>
            <Button basic color='red'>Delete</Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};
