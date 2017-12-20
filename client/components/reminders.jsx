import React from 'react';
import axios from 'axios';
import ApplicationModal from '../containers/applicationModal.jsx';

class Reminders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
    };
  }

  componentWillMount() {
    let context = this;
    console.log('getting reminders from client');
    axios.get('/api/reminders').then(res => {
      console.log(res);
      context.setState({ reminders: res.data });
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
      <div>
        <h1>Current Reminders</h1>
        <div>
          <br />
          {console.log(reminder.start)}
          <h2>{reminder.summary}</h2>
          <h2>{dateDiffInDays(a, new Date(reminder.start))} days left</h2>
          <ApplicationModal application={reminder.application} />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
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
export default Reminders;
