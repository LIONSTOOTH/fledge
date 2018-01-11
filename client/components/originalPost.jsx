import React from 'react';
import { Form, Input, TextArea, Label } from 'semantic-ui-react';

const originalPost = (props) => {
  const { postUrl, postDescription, handleChange } = props;
  return (
    <div>
      <Form widths="equal">
        <Form.Group>
          <Form.Field
            control={Input}
            type="url"
            id="postUrl"
            label="Link to original job posting"
            placeholder="Save url"
            onChange={handleChange}
            value={postUrl}
          />
          {postUrl ?
              (<a href={postUrl} target="_blank">
                <Label color="green" circular attached="top right">GO</Label>
              </a>) : null }
        </Form.Group>
        <Form.TextArea
          onChange={handleChange}
          id="postDescription"
          placeholder="Save post details here in case the original post becomes unavailable..."
          value={postDescription}
          autoHeight={true}
          label="Post details"
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
