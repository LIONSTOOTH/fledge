import React from 'react';
import axios from 'axios';
import { Segment } from 'semantic-ui-react';

class Contacts extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
    }
  }

  componentWillMount() {
    console.log("getting contacts from db");
    axios.get("/api/contacts").then(res => {
      console.log("response from server", res);
      this.setState({ contacts: res.data.contacts }, () => {
        console.log("state:", this.state.contacts);
      });
    });
  }

  render() {
    return (
      <div style={{ minHeight: 600 }}>
        <h1>Contact List</h1>
        <div>
          {this.state.contacts.map(contact => (
            <Segment>
              <h4>{contact.name}</h4>
              <h4>{contact.company}</h4>
              <h4>{contact.position}</h4>
              <h4>{contact.email}</h4>
              <h4>{contact.phone}</h4>
            </Segment>
          ))}
        </div>
      </div>
    );
  }
}

export default Contacts;
