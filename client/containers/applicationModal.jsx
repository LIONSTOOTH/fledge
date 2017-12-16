import React from 'react';
import {
  Button,
  Header,
  Grid,
  Menu,
  Segment,
  Modal,
} from 'semantic-ui-react';
import ModalNavContainer from '../components/modalNavContainer.jsx';

class ApplicationModal extends React.Component {
  constructor() {
    super();
    this.state = { activeItem: 'Application Details' };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { application, trigger } = this.props;
    const { activeItem } = this.state;
    return (
      <Modal
        trigger={
          trigger ? (
            trigger
          ) : (
            <Button basic color="blue">
              Expand
            </Button>
          )
        }
      >
        <Modal.Header>
          <span><Header>{application.company}</Header>{application.companyPhotoUrl}</span>
          {application.position}
        </Modal.Header>

        <Modal.Content scrolling>
          <Segment>
            <Grid>
              <Grid.Column width={4}>
                <Menu fluid vertical tabular>
                  <Menu.Item
                    name="Application Details"
                    active={activeItem === 'Application Details'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="Original Posting"
                    active={activeItem === 'Original Posting'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="Add A Reminder"
                    active={activeItem === 'Add A Reminder'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="Contacts"
                    active={activeItem === 'Contacts'}
                    onClick={this.handleItemClick}
                  />
                </Menu>
              </Grid.Column>

              <Grid.Column stretched width={12}>
                <ModalNavContainer
                  application={application}
                  view={this.state.activeItem}
                />
              </Grid.Column>
            </Grid>
          </Segment>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ApplicationModal;
