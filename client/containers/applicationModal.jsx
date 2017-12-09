import React from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';

// import { connect } from 'react-redux';
// need to create dispatch action
// import { addApplication } from '../actions';

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
          <Header>Modal Header</Header>
          <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>

          {/*_.times(8, i => (
            <Image
              key={i}
              src=''
              style={{ paddingBottom: 5 }}
            />
          ))*/}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button primary>
          Proceed <Icon name='right chevron' />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ApplicationModal;