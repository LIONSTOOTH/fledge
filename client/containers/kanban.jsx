import React from 'react';
import { Column } from '../components/column.jsx';
import { getAllApplications } from '../actions/jobApplications.jsx'

export const Kanban = () => {
  return(
    <div>
  {/* columns will dispatch action to receive applications based on user and status prop*/}
    <Column applications={getAllApplications()}/>

  </div>
);
}

