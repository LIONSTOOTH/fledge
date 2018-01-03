import React from 'react';
import ApplicationModal from '../containers/applicationModal.jsx';
import Kanban from '../containers/kanban.jsx';

const Dashboard = () => (
  <div>
    <ApplicationModal
      application=""
      buttonLabel="Add an application"
    />
    <br />
    <br />
    <Kanban />
  </div>
);

export default Dashboard;
