import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';


class ModalForm extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(  () =>{console.log('hello applications', this.props.application) }   )}>
        <div>
          <label htmlFor="firstName">Company Name</label>
          <Field name="firstName" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">Description</label>
          <Field name="lastName" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" />
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
