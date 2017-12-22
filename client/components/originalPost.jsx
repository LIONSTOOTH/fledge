import React from "react";
import { Form, Input, TextArea } from "semantic-ui-react";

class originalPost extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { value } = this.state;
    const { postUrl, postDescription, handleChange } = this.props;
    return (
      <div>
        <Form widths="equal">
            <Form.Field
              control={Input}
              type="url"
              id="postUrl"
              label="Link to original job posting:"
              placeholder={"Add url"}
              onChange={handleChange}
              value={postUrl}
            />

          <TextArea
            autoHeight={true}
            onChange={handleChange}
            id="postDescription"
            label="Post details:"
            placeholder={"Copy and paste post details here..."}
            value={postDescription}
          />
        </Form>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default originalPost;
