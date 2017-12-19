import React from 'react'
import { Button, Form, Input } from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class ModalContacts extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  handleChange(e, { value }) {
    this.setState({ value })
  }

  render() {
    const { value } = this.state;

    return (
      <div>
      <Form>
        <label>Add a contact</label>
        <br />
        <Form.Group width="equal">
          <Form.Field control={Input} label='Name' placeholder='Contact Name' />
          <Form.Field control={Input} label='Position' placeholder='Contact Position' />
        </Form.Group>
        <Form.Group width="equal">
          <Form.Field control={Input} type="email" label='Email' placeholder='Contact Email' />
          <Form.Field control={Input} type="text" label='Phone' placeholder='Contact Phone' />
        </Form.Group>
          <Form.Field control={Input} label='Company' placeholder='Contact Company' />

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


export default ModalContacts;
