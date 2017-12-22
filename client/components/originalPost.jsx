import React from 'react';
import { Form, Input, TextArea } from 'semantic-ui-react';

const originalPost = (props) => {
  const { postUrl, postDescription, handleChange } = props;
  return (
    <div>
      <Form widths="equal">
        <Form.Field
          control={Input}
          type="url"
          id="postUrl"
          label="Link to original job posting:"
          placeholder="Save url"
          onChange={handleChange}
          value={postUrl}
        />
        <div style={{ fontSize: 13, fontWeight: 'bold' }}>Post details:</div>
        <TextArea
          onChange={handleChange}
          id="postDescription"
          placeholder="Save post details here in case the original post becomes unavailable..."
          value={postDescription}
          autoHeight={true}
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
};

export default originalPost;
