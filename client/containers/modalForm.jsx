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
      searchQuery: '',
      currentCompany: this.props.application.company,
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  handleMouseDown(e, clickedResult) {
    // console.log('trying to find logo event target', e.target)
    // console.log('trying to find logo event target logo', e.target.logo)
    this.setState({ currentCompany: e.target.innerText });

    // if the application already exists, set the selected company
    this.props.application._id ? this.props.application.company = e.target.innerText : null;
  }


  handleSearchChange(e, { searchQuery }) {
    this.setState({ searchQuery })
    axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=:${this.state.searchQuery}`)
      .then((response) => {
        //semantic renders dropdown by text property
        var mapped = response.data.map((b) => {
          b.text = b.name;
          return b;
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
    console.log('values are :', values)
    if (this.props.application && this.props.application._id) {
      for (const key in values) {
        this.props.application[key] = values[key];
      }
      this.props.addOrUpdateApp({ edited: context.props.application });
    } else {
      values.company = this.state.currentCompany;
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
            //value={this.state.currentCompany}
            placeholder={this.state.currentCompany}
            onSearchChange={this.handleSearchChange}
            onClose={this.handleClose}
            onMouseDown={this.handleMouseDown}
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
  console.log('calues object:', valuesObject)
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

export default connect(mapStateToProps, { setReminder, addOrUpdateApp })(ModalForm);
