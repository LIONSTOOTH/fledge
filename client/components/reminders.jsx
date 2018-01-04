import React from 'react';
import axios from 'axios';
import ApplicationModal from '../containers/applicationModal.jsx';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import {
  Button,
  Input,
  Form,
  Dropdown,
  Segment,
  Card,
  Image,
} from 'semantic-ui-react';

// sorts reminders by due date
const compare = (a, b) => {
  if (a.start < b.start) {
    return -1;
  } else if (a.start > b.start) {
    return 1;
  }
  return 0;
};

class Reminders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
    };
  }

  componentWillMount() {
    console.log('getting reminders from client');
    let context = this;
    axios.get('/api/reminders').then(res => {
      let reminders = res.data;
      reminders.map(reminder => {
        for (let i = 0; i < context.props.applications.length; i++) {
          if (reminder.applicationId === context.props.applications[i]._id) {
            reminder.application = context.props.applications[i];
          }
        }
      });
      context.setState({ reminders: reminders }, function() {
        console.log('final state ', context.state);
      });
    });
  }

  populateState() {
    let context = this;
    axios.get('/api/reminders').then(res => {
      let reminders = res.data;
      reminders.map(reminder => {
        for (let i = 0; i < context.props.applications.length; i++) {
          if (reminder.applicationId === context.props.applications[i]._id) {
            reminder.application = context.props.applications[i];
          }
        }
      });
      context.setState({ reminders: reminders }, function() {
        console.log('final state ', context.state);
      });
    });
  }

  deleteReminder(eventId, reminderId) {
    let context = this;
    axios.post('/api/deleteReminder', { eventId: eventId, reminderId: reminderId }).then(() => {
      context.populateState();
    });
  }

  render() {
    var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    var a = new Date();
    function dateDiffInDays(a, b) {
      var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    console.log('a reminder', this.state.reminders[0])

    return (
      <div style={{ minHeight: 600 }}>
        <h1>Current Reminders</h1>
        <div>
        <Card.Group>
          {this.state.reminders.sort(compare).map(reminder => (
              <Card fluid raised centered>
                <Card.Content>
                  <Card.Header>{reminder.summary}
                    <Button.Group floated="right">
                      <ApplicationModal
                        application={reminder.application}
                        key={reminder.applicationId}
                        buttonLabel="View linked application"
                      />
                      <Button
                        compact
                        inverted
                        icon="checkmark icon"
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
          </Card.Group>
        </div>
      </div>
    );
  }
}

const addOrUpdateApp = valuesObject => {
  console.log('calues object:', valuesObject);
  return dispatch => {
    const request = axios.post('/api/applications', valuesObject);
    return request
      .then(response => {
        dispatch(fetchApplicationsSuccess(response.data.applications));
      })
      .catch(err => console.log(err));
  };
};

const mapStateToProps = state => {
  return {
    applications: state.applicationReducer.applications,
  };
};

export default connect(mapStateToProps, { addOrUpdateApp })(Reminders);
