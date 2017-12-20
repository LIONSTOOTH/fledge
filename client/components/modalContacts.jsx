import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import { Button, Form, Input } from 'semantic-ui-react';

class ModalContacts extends React.Component {
  constructor() {
    super();
    this.state = {
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      contactCompany: '',
      contactPosition: '',
    };
    this.saveContact = this.saveContact.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  saveContact() {
    const newContact = { contact: {} };
    newContact.contact.name = this.state.contactName;
    newContact.contact.email = this.state.contactEmail;
    newContact.contact.phone = this.state.contactPhone;
    newContact.contact.position = this.state.contactPosition;
    newContact._id = this.props.application._id;
    this.props.addContact({ addContact: newContact });
    console.log('save contact called with: ', JSON.stringify(newContact))
  }

  handleChange(e, value) {
    let obj = {};
    obj[value.id] = value.value;
    this.setState(obj, () => {
      console.log('state after onChange: ', this.state[value.id])
    });
  }

  render() {
    return (
      <div>
      <Form onSubmit={this.saveContact}>
        <label>Add a contact</label>
        <br />
        <br />
        <Form.Group width="equal">
          <Form.Field control={Input} onChange={this.handleChange} id="contactName" label='Name' placeholder='Contact Name' />
          <Form.Field control={Input} onChange={this.handleChange} id="contactPosition" label='Position' placeholder='Contact Position' />
        </Form.Group>
        <Form.Group width="equal">
          <Form.Field control={Input} onChange={this.handleChange} id="contactEmail" type="email" label='Email' placeholder='Contact Email' />
          <Form.Field control={Input} onChange={this.handleChange} id="contactPhone" type="phone" label='Phone' placeholder='Contact Phone' />
        </Form.Group>
        <Form.Group width="equal">
          <Form.Field control={Input} onChange={this.handleChange} id="contactCompany" label='Company' placeholder='Contact Company' />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      </div>
    )
  }
}

const addContact = (valuesObject) => {
  return (dispatch) => {
    const request = axios.post('/api/contacts', valuesObject);
    return request
      .then((response) => {
        dispatch(fetchApplicationsSuccess(response.data.applications));
      })
      .catch((err) => console.log(err));
  };
};

const fetchApplicationsSuccess = (response) => {
  return {
    type: 'FETCH_SUCCESS',
    payload: response,
  };
};

const mapStateToProps = (state) => {
  return {
    applications: state.applicationReducer.applications,
  };
};

export default connect(mapStateToProps, { addContact })(ModalContacts);

