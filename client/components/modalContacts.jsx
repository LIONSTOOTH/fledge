import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import { Button, Form, Input, Segment, Card, Icon, Header } from 'semantic-ui-react';

// sorts contacts by first name
const compare = (a, b) => {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  }
  return 0;
};

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
    this.deleteContact = this.deleteContact.bind(this);
  }

  componentWillMount() {
    axios.get('/api/contacts')
      .then(res => this.setState({ contacts: res.data.contacts }))
      .catch(err => console.log(err));
  }

  deleteContact(e) {
    axios.delete('/api/contacts', { params: { id: e.target.value || e.target.parentNode.value } })
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
    newContact.contact._id = this.props.application._id;

    axios.post('/api/contacts', { addContact: newContact })
      .then(res => this.setState({
        contacts: res.data.contacts,
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        contactCompany: '',
        contactPosition: '',
      }))
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
              value={this.state.contactName}
            />
            <Form.Field
              control={Input}
              onChange={this.handleChange}
              id="contactPosition"
              label="Position"
              value={this.state.contactPosition}
            />
          </Form.Group>
          <Form.Group width="equal">
            <Form.Field
              control={Input}
              onChange={this.handleChange}
              id="contactEmail"
              type="email"
              label="Email"
              value={this.state.contactEmail}
            />
            <Form.Field
              control={Input}
              onChange={this.handleChange}
              id="contactPhone"
              label="Phone"
              value={this.state.contactPhone}
            />
          </Form.Group>
          <Form.Group width="equal">
            <Form.Field
              control={Input}
              onChange={this.handleChange}
              id="contactCompany"
              label="Company"
              value={this.state.contactCompany}
            />
          </Form.Group>
          <Button size="tiny" type="submit">Submit</Button>
        </Form>
        <Header as="span">
          {contacts
            .filter(c => c.applicationId === application._id).length > 0 ?
            'Related Contacts:' : null}
        </Header>
        <div>
          {contacts.sort(compare)
            .filter(allContacts => allContacts.applicationId === application._id)
            .map(contact => (
                <Card raised>
                  <Card.Content>
                    <Card.Header>{contact.name}
                      <Button.Group floated="right">
                        <Button
                          compact
                          inverted
                          icon="close"
                          color="red"
                          size="mini"
                          value={contact._id}
                          onClick={this.deleteContact}
                        />
                      </Button.Group>
                    </Card.Header>
                    <Card.Meta style={{ color: 'black' }}>{contact.position}
                      {contact.position && contact.company ? ', ' : ''}
                      {contact.company}
                    </Card.Meta>
                    <br />
                    {contact.email ? (<Icon size="small" name="mail outline" />)
                    : ''}{contact.email}
                    <div />
                    {contact.phone ? (<Icon size="small" name="text telephone" />)
                    : ''}{contact.phone}
                  </Card.Content>
                </Card>
            ))}
        </div>
      </div>
    );
  }
}

export default ModalContacts;
