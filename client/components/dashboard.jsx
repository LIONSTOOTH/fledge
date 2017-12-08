import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Dashboard = () => (
  <div>
    <h2>dashboard</h2>
    <Link to="/landing">Login</Link>
  </div>
)

export default Dashboard;