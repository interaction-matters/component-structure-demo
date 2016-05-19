/*******************************
Routes
--------------------------------
Defines the routes for our app
********************************/

import React from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router';

import Root from 'templates/root/Root';
import Workspace from 'templates/workspace/Workspace';
import Demo from 'Demo';

export default (
<Route path="/" component={Workspace}>
  
  {/* Default route for root '/' path */}
  <Route path="demo" component={Demo} />

</Route>
);