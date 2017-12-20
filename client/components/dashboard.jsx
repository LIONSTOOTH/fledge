import React from 'react';
import { Button } from 'semantic-ui-react';
import ApplicationModal from '../containers/applicationModal.jsx';
import Kanban from '../containers/kanban.jsx';

const Dashboard = props => (
  <div>
    <ApplicationModal
      application=""
      trigger={
        <button class="circular ui icon green button" >
          <i class="plus icon"></i>
        </button>
      }
    />
    <Kanban />
  </div>
);

export default Dashboard;
