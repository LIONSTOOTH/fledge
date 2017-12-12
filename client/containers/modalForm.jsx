import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

let ModalForm = props => {
  const { handleSubmit, onSubmit } = props;

    let context = this;


  return (
    <form onSubmit={handleSubmit(  () =>{console.log(reduxForm) }   )}>
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

ModalForm = reduxForm({

  form: 'application'
})(ModalForm)

const mapStateToProps = (state) => {
  return {
    applications: state.applicationReducer.applications,
    isFetching: state.fetchFlagReducer.isFetching,
  };
}

// export default connect(mapStateToProps,
//   { fetchApplicationsSuccess, getAllApplications })(Kanban);

export default ModalForm;