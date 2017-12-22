import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import { Button, Input, Form, Dropdown, Segment } from 'semantic-ui-react';

class Reminder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminderText: '',
      numWeeks: '1',
      reminders: [],
    };
    this.setReminder = this.setReminder.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  setReminder() {
    const next = this.nextWeek(this.state.numWeeks);
    const newReminder = {};
    newReminder.summary = 'Follow up with ' + this.props.company
    newReminder.description = this.state.reminderText;
    newReminder.start = next;
    newReminder.applicationId = this.props.application._id
    this.props.addReminderToApp({ addReminder: newReminder }).then(this.getReminders.bind(this));

  }

  getReminders() {
    let context = this;
    // console.log(context.props.application)
    let id = context.props.application._id
    axios.post('/api/appReminders', {appId: id}).then(res => {
      console.log('response data: ', res.data)
      context.setState({reminders: res.data}, () => {
        console.log('reminders in state: ' + this.state.reminders);
      });
    })
  }

  componentWillMount() {
    this.getReminders();
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

  deleteReminder() {

  }

  render() {
    console.log('state during render', this.state.reminders)
    const { application, company } = this.props;
    const options = [{ key: 1, text: '1', value: '1' }, { key: 2, text: '2', value: '2' }];
    var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    var a    = new Date();
    function dateDiffInDays(a, b) {
      var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
    return (
      <div>
      <h1>Follow up with {this.props.company}</h1>
      <Form onSubmit={this.setReminder}>
        <Form.Field
          control={Input}
          onChange={this.handleChange}
          label="Add a reminder"
          type="text"
          id="reminderText"
          placeholder='Optional: Add a Description'
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
      <h2>Current reminders</h2>
        <div>
          {this.state.reminders.map(reminder => (
            <Segment>
              <h4>{reminder.summary}</h4>
              <h4>{reminder.description}</h4>
              <h4>{dateDiffInDays(a, (new Date(reminder.start)))} days left</h4>
              <Button basic color="green" onClick={this.deleteReminder.bind(this)}>
                  <i class="checkmark box icon"></i>
                </Button>
            </Segment>
          ))}
        </div>
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
