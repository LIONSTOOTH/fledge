import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import { Button, Input, Form, Dropdown } from 'semantic-ui-react';

class Reminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminderText: '',
      numWeeks: '1',
    };
    this.setReminder = this.setReminder.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  setReminder() {
    const next = this.nextWeek(this.state.numWeeks);
    const newReminder = {};
    newReminder.summary = this.state.reminderText;
    newReminder.start = next;
    newReminder.application = this.props.application;
    this.props.addReminderToApp({ addReminder: newReminder });
  }

  handleChange(e, value) {
    let obj = {};
    obj[value.id] = value.value;
    this.setState(obj);
  }

  nextWeek(weeks) {
    var next = new Date();
    return new Date(next.getFullYear(), next.getMonth(), next.getDate() + (7 * parseInt(weeks)));
  }

  render() {
    const { application, company } = this.props;
    const options = [{ key: 1, text: '1', value: '1' }, { key: 2, text: '2', value: '2' }];
    return (
      <div>
      <Form onSubmit={this.setReminder}>
        <Form.Field
          control={Input}
          onChange={this.handleChange}
          label="Add a reminder"
          type="text"
          id="reminderText"
          placeholder={`Follow up on ${company} application`}
        />
          Set reminder for
          <Dropdown
          placeholder='1'
          id="numWeeks"
          compact
          selection
          options={options}
          onChange={this.handleChange}
          /> week(s)
          <br/>
          <br/>
        <Button type="submit">Submit</Button>
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

const addReminderToApp = (valuesObject) => {
  return (dispatch) => {
    const request = axios.post('/api/reminders', valuesObject);
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

export default connect(mapStateToProps, { addReminderToApp })(Reminder);
