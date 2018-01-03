import React from 'react';
import ApplicationModal from '../containers/applicationModal.jsx';
import Kanban from '../containers/kanban.jsx';

const Dashboard = (props) => (
  <div>
    <ApplicationModal
      application=""
      buttonLabel="Add an application"
      className="applicationButton"
      application={{ _id: undefined }}
    />
    <br />
    <br />
    <Kanban releaseConfetti={props.releaseConfetti} />
  </div>
);

export default Dashboard;
