import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Kanban from '../containers/kanban.jsx';

const Dashboard = (props) => (
  <div>
    <Button
      color='orange'
      size='massive'
      onClick={props.handleLogin}
    >
      Logout
    </Button>
    <h2>dashboard</h2>
    <Kanban/>
  </div>
);

export default Dashboard;