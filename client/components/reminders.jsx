import React from 'react';
import axios from 'axios';
import ApplicationModal from '../containers/applicationModal.jsx';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';

class Reminders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
    };
  }

  componentWillMount() {
    let context = this;

    console.log('getting reminders from client')

    axios.get('/api/reminders').then(res => {
      let reminders = res.data
      reminders.map(reminder => {
        for (let i = 0; i < context.props.applications.length; i++) {
          console.log('reminderID: ' + reminder.applicationId + ' applicationID ' + context.props.applications[i]._id)
          if (reminder.applicationId === context.props.applications[i]._id) {
            reminder.application = context.props.applications[i];
          }
        }
      })
      context.setState({reminders: reminders}, function(){
        console.log('final state ', context.state);
      })
    })
  }


  render() {

  var _MS_PER_DAY = 1000 * 60 * 60 * 24;
  var a    = new Date();
  function dateDiffInDays(a, b) {
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

    return (
      <div>
      <h1>Current Reminders</h1>
      <div>{this.state.reminders.map((reminder) =>
        <div>
        <br></br>
        {console.log(reminder.start)}
        <h2>{reminder.summary}</h2>
        <h2>{
    dateDiffInDays(a, (new Date(reminder.start)))
          } days left</h2>
      <ApplicationModal application={reminder.application} />

        </div>

        )}
      </div>
      </div>
    )
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

export default connect(mapStateToProps, { addOrUpdateApp })(Reminders)
