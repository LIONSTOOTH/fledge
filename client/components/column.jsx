import React from 'react';
import ApplicationChip from '../components/applicationChip.jsx';

export const Column = ({ applications }) => {
  console.log('in column', applications)
  return(
    <div>
    <h1>{applications.applications[0].status}</h1>
    <ul>
      {applications.applications.map((application) =>
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

