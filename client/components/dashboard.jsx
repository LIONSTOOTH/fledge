import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Kanban from '../containers/kanban.jsx';

const Dashboard = (props) => (
  <div>
    <h2>dashboard</h2>
    <Kanban/>
  </div>
);

export default Dashboard;