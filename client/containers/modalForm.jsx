import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import { Button, Icon, Dropdown } from 'semantic-ui-react';
import { Field, FieldArray, reduxForm, formValues } from 'redux-form';

class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessList: [],
      selectedOption: '',
      searchQuery: '',
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(e, { searchQuery }) {
    // trying to grab the clicked item from dropdown
    console.log('e onSearchChange:', e.target)
    this.setState({ searchQuery })
    axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=:${this.state.searchQuery}`)
      .then((response) => {
        //semantic renders dropdown by text property
        var mapped = response.data.map((b) => {
          b.text = b.name;
          return b
        })
        console.log('RESPONSE', mapped)
        this.setState({ businessList: mapped })
      })
      .catch((err) => console.log(err));
  }

  handleFormInput(key) {
    console.log(this.state.email)
    var that = this;
    return (e) => {
      var state = {};
      state[key] = e.target.value;
      that.setState(state);
    }
  }

  editApplication(values) {
    const context = this;

    if (this.props.application && this.props.application._id) {
      for (const key in values) {
        this.props.application[key] = values[key];
      }
      this.props.addOrUpdateApp({ edited: context.props.application });
    } else {
      this.props.addOrUpdateApp({ newApplication: values });
    }
  }

  render() {
    const { handleSubmit, application } = this.props;
    return (
      <div>
      <div>

        </div>

      <form onSubmit={handleSubmit(this.editApplication.bind(this))}>
        <div>
          <label htmlFor="firstName">Company Name</label>

          <Dropdown
            fluid
            selection
            multiple={false}
            search={true}
            options={this.state.businessList}
            value={this.state.searchQuery}
            placeholder={application.company}
            //onChange={this.handleSearchChange}
            onSearchChange={this.handleSearchChange}
            disabled={false}
            loading={false}
          />

        </div>
        <br />
        <div>
          <label htmlFor="position">Position</label>
          <Field
            name="position"
            component="input"
            type="text"
            placeholder={application.position}
          />
        </div>
        <br />
        <div>
          <label htmlFor="date">Date Applied</label>
          <Field
            name="date"
            component="input"
            type="text"
            placeholder={application.date}
          />
        </div>
        <br />
        <div>
          <label>Status</label>
          <span>
            <Field name="status" component="select" placeholder="">
              <option value={application.status}>
                {' '}
                {application.status}
              </option>
              <option value="In Progress">In Progress</option>
              <option value="Submitted">Submitted</option>
              <option value="Phone Screen">Phone Screen</option>
              <option value="Onsite Interview">Onsite Interview</option>
              <option value="Offer">Offer</option>
            </Field>
          </span>
        </div>
        <br />
        <br />
        <Button type="submit" size="small" color="blue">
          Submit
          <Icon name="right chevron" />
        </Button>
      </form>
      </div>
    );
  }
}

const fetchApplicationsSuccess = response => {
  return {
    type: 'FETCH_SUCCESS',
    payload: response
  };
};

const addOrUpdateApp = valuesObject => {
  return dispatch => {
    const request = axios.post('/api/applications', valuesObject);

    return request
      .then(response => {
        dispatch(fetchApplicationsSuccess(response.data.applications));
      })
      .catch(err => console.log(err));
  };
};

const setReminder = () => {
  return dispatch => {
    const nextweek = () => {
      var today = new Date();
      var next = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7
      );
      return next;
    };

    const request = axios.get('/api/reminders');

    return request
      .then(response => {
        dispatch(fetchApplicationsSuccess(response.data.apps));
      })
      .catch(err => console.log(err));
  };
};

const mapStateToProps = state => {
  return {
    applications: state.applicationReducer.applications
  };
};

ModalForm = reduxForm({
  form: 'application'
})(ModalForm);

export default connect(mapStateToProps, { setReminder, addOrUpdateApp })(
  ModalForm
);

/*
var event = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2017-12-15T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2017-12-16T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'lpage@example.com'},
    {'email': 'sbrin@example.com'},
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },



  //create new date based on selection

  function nextweek(){
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
    return nextweek;
}


{
  company: 'Etsy'
  start: '2017-12-15'
  reminder: true
  reminderTime: 1 (or 2 for weeks)
}

“Etsy application followup” || whatever user inputs


*/
