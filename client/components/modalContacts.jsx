import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import { Button, Form, Input, Segment, Card, Header } from 'semantic-ui-react';

class ModalContacts extends React.Component {
  constructor() {
    super();
    this.state = {
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      contactCompany: '',
      contactPosition: '',
      contacts: [],
    };
    this.saveContact = this.saveContact.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    axios.get('/api/contacts')
      .then(res => this.setState({ contacts: res.data.contacts }))
      .catch(err => console.log(err));
  }

  saveContact() {
    const newContact = { contact: {} };
    newContact.contact.name = this.state.contactName;
    newContact.contact.email = this.state.contactEmail;
    newContact.contact.phone = this.state.contactPhone;
    newContact.contact.position = this.state.contactPosition;
    newContact.contact.company = this.state.contactCompany;
    // if app id is undefined, saveContact should save the entire application from parent state
    newContact.contact._id = this.props.application._id;

    axios.post('/api/contacts', { addContact: newContact })
      .then(res => this.setState({ contacts: res.data.contacts }))
      .catch(err => console.log(err));
  }

  handleChange(e, value) {
    const obj = {};
    obj[value.id] = value.value;
    this.setState(obj);
  }

  render() {
    const { application } = this.props;
    const { contacts } = this.state;
    return (
      <div>
        <Form onSubmit={this.saveContact}>
          <Header as="div">
            <Header.Content>
              Add A Contact:
            </Header.Content>
          </Header>
          <Form.Group width="equal">
            <Form.Field
              control={Input}
              onChange={this.handleChange}
              id="contactName"
              label="Name"
              placeholder={this.state.contactName}
            />
            <Form.Field
              control={Input}
              onChange={this.handleChange}
              id="contactPosition"
              label="Position"
              placeholder={this.state.contactPosition}
            />
          </Form.Group>
          <Form.Group width="equal">
            <Form.Field
              control={Input}
              onChange={this.handleChange}
              id="contactEmail"
              type="email"
              label="Email"
              placeholder={this.state.contactEmail}
            />
            <Form.Field
              control={Input}
              onChange={this.handleChange}
              id="contactPhone"
              // type="phone"
              label="Phone"
              placeholder={this.state.contactPhone}
            />
          </Form.Group>
          <Form.Group width="equal">
            <Form.Field
              control={Input}
              onChange={this.handleChange}
              id="contactCompany"
              label="Company"
              placeholder={this.state.contactCompany}
            />
          </Form.Group>
          <Button size="tiny" type="submit">Submit</Button>
        </Form>
        <Header as="span">
          Related Contacts:
        </Header>
        <div>
          {contacts
            .filter(allContacts => allContacts.applicationId === application._id)
            .map(contact => (
              <Segment basic>
                <Card>
                  <Card.Content>
                    <Card.Header>{contact.company}</Card.Header>
                    <Card.Meta>{contact.position}</Card.Meta>
                    <br />
                    Name: {contact.name}
                    <br />
                    Email: {contact.email}
                    <br />
                    Phone: {contact.phone}
                    <br />
                  </Card.Content>
                </Card>
              </Segment>
            ))}
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default ModalContacts;
