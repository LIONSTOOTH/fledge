import React from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';
import ModalForm from './modalForm.jsx';

const ApplicationModal = ({ application, dispatch, trigger }) => {
  return (
    <Modal
      trigger={trigger ? trigger :
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
          <div>
          <ModalForm onSubmit={values => {console.log(this.props)}} />

          </div>
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