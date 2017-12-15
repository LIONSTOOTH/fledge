import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import { Field, reduxForm, formValues } from 'redux-form';


class ModalForm extends React.Component {
  constructor(props) {
    super(props);
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
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.editApplication.bind(this))}>
        <div>
          <label htmlFor="firstName">Company Name</label>
          <Field name="company" component="input" type="text" placeholder={this.props.application.company} />
        </div>
        <br />
        <div>
          <label htmlFor="position">Position</label>
          <Field name="position" component="input" type="text" placeholder={this.props.application.position} />
        </div>
        <br />
        <div>
          <label htmlFor="date">Date Applied</label>
          <Field name="date" component="input" type="text" placeholder={this.props.application.date} />
        </div>
        <br />
        <div>
          <label>Status</label>
          <span>
            <Field name="status" component="select" placeholder="poop" >
              <option value={this.props.application.status}> {this.props.application.status}</option>

              <option value="In Progress">In Progress</option>
              <option value="Submitted">Submitted</option>
              <option value="Phone Screen">Phone Screen</option>
              <option value="Onsite Interview">Onsite Interview</option>
              <option value="Offer">Offer</option>
            </Field>
          </span>
        </div>

        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const fetchApplicationsSuccess = (response) => {
  return {
    type: 'FETCH_SUCCESS',
    payload: response,
  };
};

const addOrUpdateApp = (valuesObject) => {
  return (dispatch) => {
    const request = axios.post('/api/applications', valuesObject);

    return request.then((response) => {
      dispatch(fetchApplicationsSuccess(response.data.applications));
    })
      .catch(err => console.log(err));
  };
};

const getAllApplications = () => {
  return (dispatch) => {
    // dispatch a flag action to show waiting view
    dispatch({ type: 'IS_FETCHING' });

    const request = axios.get('/api/applications');

    return request.then((response) => {
      dispatch(fetchApplicationsSuccess(response.data.apps));
    })
      .then(dispatch({ type: 'IS_FETCHING' }))
      .catch(err => console.log(err));
  };
};

const mapStateToProps = (state) => {
  return {
    applications: state.applicationReducer.applications,

  };
};

ModalForm = reduxForm({
  form: 'application',
})(ModalForm);

export default connect(mapStateToProps, { getAllApplications, addOrUpdateApp })(ModalForm);
