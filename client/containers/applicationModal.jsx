import React from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';

const ApplicationModal = ({ application, dispatch }) => {
  return (
    <Modal
      trigger={
        <Button
          basic color='blue'>
            Expand
        </Button>
      }
    >
      <Modal.Header>{application.company}</Modal.Header>
      <Modal.Content image scrolling>
        <Image
          size='medium'
          src=''
          wrapped
        />

        <Modal.Description>
          <Header>{application.position}</Header>
          <p>Content..... will need a form in here</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button primary>
          Save <Icon name='right chevron' />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ApplicationModal;