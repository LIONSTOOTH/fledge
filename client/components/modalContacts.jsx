import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import thunk from "redux-thunk";
import { Button, Form, Input, Segment } from "semantic-ui-react";

class ModalContacts extends React.Component {
  constructor() {
    super();
    this.state = {
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      contactCompany: "",
      contactPosition: "",
      contacts: []
    };
    this.saveContact = this.saveContact.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  saveContact() {
    const newContact = { contact: {} };
    newContact.contact.name = this.state.contactName;
    newContact.contact.email = this.state.contactEmail;
    newContact.contact.phone = this.state.contactPhone;
    newContact.contact.position = this.state.contactPosition;
    newContact.contact.company = this.state.contactCompany;
    // if app id is undefined, saveContact should save the entire application from parent state
    newContact.contact._id = this.props.application._id;

    axios
      .post("/api/contacts", { addContact: newContact })
      .then(res => {
        console.log("response from server", res);
        this.setState({ contacts: res.data });
      })
      .catch(err => console.log(err));
  }

  handleChange(e, value) {
    let obj = {};
    obj[value.id] = value.value;
    this.setState(obj, () => {
      console.log("state after onChange: ", this.state[value.id]);
    });
  }

  render() {
    const { application } = this.props;
    const { contacts } = this.state;
    console.log("application", application);
    return (
      <div>
        <Form onSubmit={this.saveContact}>
          <label>Add a contact</label>
          <br />
          <br />
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
              type="phone"
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
          <Button type="submit">Submit</Button>
        </Form>
        <br />
        <br />
          <div>
          {this.state.contacts.filter(allContacts => allContacts.applicationId === application._id)
            .map(contact => (
            <Segment>
              <h4>{contact.name}</h4>
              <h4>{contact.company}</h4>
              <h4>{contact.position}</h4>
              <h4>{contact.email}</h4>
              <h4>{contact.phone}</h4>
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
