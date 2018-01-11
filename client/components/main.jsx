import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './dashboard.jsx';
import App from './app.jsx';

const Main = () => (
  <Router>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </Router>
);

export default Main;
