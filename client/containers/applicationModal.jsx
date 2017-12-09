import React from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';

const ApplicationModal = ({ dispatch }) => {
  return (
    <Modal trigger={<Button>Scrolling Content Modal</Button>}>
      <Modal.Header>Application Detail</Modal.Header>
      <Modal.Content image scrolling>
        <Image
          size='medium'
          src=''
          wrapped
        />

        <Modal.Description>
          <Header>Header</Header>
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