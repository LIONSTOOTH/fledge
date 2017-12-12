import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import ApplicationModal from '../containers/applicationModal.jsx';
import Kanban from '../containers/kanban.jsx';

const Dashboard = (props) => (
  <div>
    <ApplicationModal application=""
      trigger={
      <Button basic color='blue'>
        Add application
      </Button>
    }/>
    <Kanban/>
  </div>
);

export default Dashboard;