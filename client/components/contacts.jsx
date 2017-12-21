import React from 'react';
import axios from 'axios';
import { Segment, Card } from 'semantic-ui-react';

class Contacts extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
    };
  }

  componentWillMount() {
    console.log('getting contacts from db');
    axios.get('/api/contacts').then(res => {
      console.log('response from server', res);
      this.setState({ contacts: res.data.contacts }, () => {
        console.log('state:', this.state.contacts);
      });
    });
  }

  render() {
    return (
      <div style={{ minHeight: 600 }}>
        <h1>Contact List</h1>
        <div>
          {this.state.contacts.map(contact => (
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
      </div>
    );
  }
}

export default Contacts;
