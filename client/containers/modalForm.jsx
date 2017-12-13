import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { formValues } from 'redux-form';


class ModalForm extends React.Component {
  constructor(props) {
    super(props);
  }

  editApplication(values) {

    let context = this;

    for (let key in values) {
      this.props.application[key] = values[key];
    }

    console.log(this.props.application);

    axios.post('/edit', {
      edited: context.props.application
    }).then(function(response) {
      console.log('saved edited application')
    })

  }

  submit(values) {
    // print the form values to the console
    console.log(values)
  }

  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(  this.editApplication.bind(this)    )}>
        <div>
          <label htmlFor="firstName">Company Name</label>
          <Field name="company" component="input" type="text" placeholder={this.props.application.company} />
        </div>
        <div>
          <label htmlFor="position">Position</label>
          <Field name="position" component="input" type="text" placeholder={this.props.application.position} />
        </div>

        <div>
          <label htmlFor="date">Date Applied</label>
          <Field name="date" component="input" type="text" placeholder={this.props.application.dateApplied} />
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

ModalForm = reduxForm({

  form: 'application'
})(ModalForm)


const getAllApplications = (user) => {
  return (dispatch) => {
    // dispatch a flag action to show waiting view
    dispatch({ type: 'IS_FETCHING' })

    const request = axios.get('/api/applications');

    return request.then(
      response => dispatch(fetchApplicationsSuccess(response.data.apps)))
      .then(dispatch({ type: 'IS_FETCHING'}))
      .catch(err => console.log(err));
  }
}

const mapStateToProps = (state) => {
  return {
    applications: state.applicationReducer.applications

  };
}

export default connect(mapStateToProps, {getAllApplications})(ModalForm)

// export default connect(mapStateToProps,
//   { fetchApplicationsSuccess, getAllApplications })(Kanban);
