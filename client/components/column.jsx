import React from 'react';
import ApplicationChip from '../components/applicationChip.jsx';
import { getAllApplications } from '../actions/jobApplications.jsx';
import { connect } from 'react-redux';


export const Column = ({ title, applications }) => {
  console.log('applications in column', applications)
  return(
    <div style={{ border: 'solid 3px red' }}>
    <h1>{title}</h1>
    <ul>
      {applications.map((application) =>
        <ApplicationChip
          key={application.id}
          id={application.id}
          application={application}
        />
      )}
    </ul>

  </div>
);
}

// dispatches an action
const fetchApplicationsActionCreator = () => {
  return {
    type: 'FETCH_APPLICATIONS',
    payload: getAllApplications(),
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    applications: state.applicationReducer
  };
}

export default connect(mapStateToProps, { fetchApplicationsActionCreator })(Column)