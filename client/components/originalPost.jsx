import React from 'react'
import { Button, Form, Icon, Input, TextArea } from 'semantic-ui-react'


class originalPost extends React.Component {
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
      <div>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field control={Input} type="url" label='Link to original job posting:' placeholder='Add url' />
        </Form.Group>
        <Form.Field control={TextArea} label='Post details:' placeholder='Copy and paste post details here...' />
        <Form.Field control={theButton}>
        </Form.Field>
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


export default originalPost;
