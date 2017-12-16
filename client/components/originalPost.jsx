import React, { Component } from 'react'
import { Button, Form, Icon, Input, TextArea } from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class originalPost extends Component {
  constructor() {
    super();
    this.state = {}
  }

  handleChange(e, { value }) {
    this.setState({ value })
  }

  render() {
    const { value } = this.state;
    const theButton = () => (<Button type="submit" size="small" color="blue">Submit<Icon name="right chevron"/></Button>);
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Field control={Input} label='Link to original job posting:' placeholder='Add url' />
        </Form.Group>
        <Form.Field control={TextArea} label='Post details:' placeholder='Copy and paste post details here...' />
        <Form.Field control={theButton}>
        </Form.Field>
      </Form>
    )
  }
}


export default originalPost;
