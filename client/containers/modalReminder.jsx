import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import { Button, Input, Form, Dropdown, Card, Header } from 'semantic-ui-react';

// sorts reminders by due date
const compare = (a, b) => {
  if (a.start < b.start) {
    return -1;
  } else if (a.start > b.start) {
    return 1;
  }
  return 0;
};

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
    this.getReminders = this.getReminders.bind(this);
    this.deleteReminder = this.deleteReminder.bind(this);
  }

  componentWillMount() {
    this.getReminders();
  }

  setReminder() {
    const next = this.nextWeek(this.state.numWeeks);
    const newReminder = {};
    newReminder.summary = 'Follow up with ' + this.props.company;
    newReminder.description = this.state.reminderText;
    newReminder.start = next;
    newReminder.applicationId = this.props.application._id;
    axios.post('/api/reminders', { addReminder: newReminder })
      .then(() => this.getReminders());
  }

  getReminders() {
    const id = this.props.application._id;
    axios.post('/api/appReminders', { appId: id })
      .then((res) => {
        this.setState({
          reminders: res.data,
          reminderText: '',
        });
      });
  }

  handleChange(e, value) {
    const obj = {};
    obj[value.id] = value.value;
    this.setState(obj);
  }

  nextWeek(weeks) {
    const next = new Date();
    return new Date(
      next.getFullYear(),
      next.getMonth(),
      next.getDate() + 7 * parseInt(weeks)
    );
  }

  deleteReminder(eventId, reminderId) {
    axios.post('/api/deleteReminder', { eventId: eventId, reminderId: reminderId })
      .then(() => this.getReminders());
  }

  render() {
    const { application, company } = this.props;
    const options = [
      { key: 1, text: '1', value: '1' },
      { key: 2, text: '2', value: '2' },
    ];
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const a = new Date();
    function dateDiffInDays(a, b) {
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
    return (
      <div>
        <Header as="div">
          <Header.Content>
            Add A Reminder:
          </Header.Content>
        </Header>
        <Form onSubmit={this.setReminder}>
          <Form.Field
            control={Input}
            onChange={this.handleChange}
            label={`Follow up with ${company}`}
            type="text"
            id="reminderText"
            placeholder="Optional: Add a description"
            value={this.state.reminderText}
          />
          Set reminder for
          <Dropdown
            placeholder="1"
            id="numWeeks"
            compact
            selection
            options={options}
            onChange={this.handleChange}
          />{' '}
          week(s)
          <br />
          <Button size="tiny" type="submit">Submit</Button>
        </Form>
        <Header as="span">
          {this.state.reminders
            .filter(r => r.applicationId === application._id).length > 0 ?
            'Current Reminders:' : null}
        </Header>
        {this.state.reminders.sort(compare).map(reminder => (
          <Card fluid raised centered>
            <Card.Content>
              <Card.Header>{reminder.summary}
                <Button.Group floated="right">
                  <Button
                    compact
                    inverted
                    icon="checkmark"
                    size="mini"
                    color="green"
                    onClick={this.deleteReminder.bind(this, reminder.eventId, reminder._id)}
                  />
                </Button.Group>
              </Card.Header>
              {reminder.description}
              <Card.Meta>
                Days Left: {dateDiffInDays(a, new Date(reminder.start))}
              </Card.Meta>
            </Card.Content>
          </Card>
          ))}
        <br />
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    applications: state.applicationReducer.applications,
  };
};

export default connect(mapStateToProps)(Reminder);
