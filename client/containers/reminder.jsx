import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import { Button, Input, Form } from 'semantic-ui-react';

class Reminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminderText: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.setReminder = this.setReminder.bind(this);
  }

  setReminder() {
    const next = this.nextWeek();
    const newReminder = {};
    newReminder.summary = this.state.reminderText;
    newReminder.start = next;
    newReminder.reminder = true;
    newReminder.reminderTime = 1;
    this.props.addReminderToApp({ addReminder: newReminder });
  }

  handleChange(e) {
    this.setState({ reminderText: e.target.value });
  }

  nextWeek() {
    const today = new Date();
    const next = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7,
    );
    return next;
  }

  render() {
    const { application } = this.props;
    return (
      <Form onSubmit={this.setReminder}>
        <Form.Field
          control={Input}
          onChange={this.handleChange}
          label="Add a reminder"
          type="text"
          placeholder={`Follow up on ${application.company} application`}
        />
        <Button type="submit">Submit</Button>
      </Form>
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
