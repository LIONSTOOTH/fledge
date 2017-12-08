import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './landing.jsx';
import Dashboard from './dashboard.jsx';
import App from './app.jsx';

const Main = () => (
  <Router>
    <Switch>
      <Route path="/" exact={true} component = {App} />
      <Route path="/landing" component = {Landing} />
      <App />
    </Switch>
  </Router>
)

export default Main;