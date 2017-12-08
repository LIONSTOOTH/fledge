import React from 'react';
import ApplicationChip from '../containers/applicationChip.jsx'

export const ColumnList = ({ applications }) => (
  <ul>
    {aplications.map(application =>
      <ApplicationChip
        key={application.id}
        {...application}
      />
    )}
  </ul>
);

