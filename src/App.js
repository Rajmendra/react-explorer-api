import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import WebAPIs from './components/WebAPIs';
import APIDetails from './components/APIDetails';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sidebar" component={Sidebar} />
        <Route path="/web-apis/:provider" component={WebAPIs} />
        <Route path="/api-details/:provider/:xservicename/:api" component={APIDetails} />
      </Switch>
    </Router>
  );
};

export default App;
