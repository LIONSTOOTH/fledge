import React from 'react';
import Kanban from '../containers/kanban.jsx';

const Dashboard = props => (
  <div>
    <Kanban releaseConfetti={props.releaseConfetti} />
  </div>
);

export default Dashboard;
