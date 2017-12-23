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

  deleteReminder(reminderId) {
    let context = this;
    console.log('HELLOOOO', reminderId);
    axios.post('/api/deleteReminder', { id: reminderId }).then(() => {
      console.log('deleted');
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

    return (
      <div style={{ minHeight: 600 }}>
        <h1>Current Reminders</h1>
        <div>
          {this.state.reminders.map(reminder => (
            <Segment basic>
              <Card>
                <Card.Content>
                  <Card.Header>{reminder.summary}</Card.Header>
                  <Card.Meta>
                    Days Left: {dateDiffInDays(a, new Date(reminder.start))}
                  </Card.Meta>
                  <br />
                  {reminder.description}
                  <br />
                  <div className="ui two buttons">
                    <ApplicationModal application={reminder.application} />
                    <Button
                      basic
                      color="green"
                      onClick={this.deleteReminder.bind(this, reminder._id)}
                    >
                      <i class="checkmark icon" />
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </Segment>
          ))}
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
