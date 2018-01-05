import React from 'react';
import axios from 'axios';
import ApplicationModal from '../containers/applicationModal.jsx';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import {
  Button,
  Card,
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
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const a = new Date();
    function dateDiffInDays(a, b) {
      var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    return (
      <div style={{ minHeight: 600 }}>
        <h1>Current Reminders</h1>
        <div>
          {this.state.reminders.sort(compare).map(reminder => (
            <Card
              fluid
              raised
              centered
              style={{ maxWidth: 650 }}
            >
              <Card.Content>
                <Card.Header>{reminder.summary}
                  <Button.Group floated="right">
                    <Button
                      compact
                      inverted
                      icon="checkmark icon"
                      size="mini"
                      color="green"
                      style={{ marginLeft: 15 }}
                      onClick={this.deleteReminder.bind(this, reminder.eventId, reminder._id)}
                    />
                  </Button.Group>
                  <Button.Group floated="right">
                    <ApplicationModal
                      application={reminder.application}
                      key={reminder.applicationId}
                      className="ui reminder button"
                      // buttonLabel="View linked application"
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
        </div>
      </div>
    );
  }
}

const addOrUpdateApp = (valuesObject) => {
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

const mapStateToProps = (state) => {
  return {
    applications: state.applicationReducer.applications,
  };
};

export default connect(mapStateToProps, { addOrUpdateApp })(Reminders);
