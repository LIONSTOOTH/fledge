import React from 'react';
import ApplicationChip from '../components/applicationChip.jsx';

export const Column = ({ title, applications }) => {
  console.log('title, applications in column:', title, applications)
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

