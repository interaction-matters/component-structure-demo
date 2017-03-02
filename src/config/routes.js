/*******************************
Routes
--------------------------------
Defines the routes for our app
********************************/

import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router';

import Root from 'templates/root/Root';
import Workspace from 'templates/workspace/Workspace';
import Demo from 'Demo';
import Markers from 'components/Markers/Markers';
import Document from 'views/Document/Document';
import Snippets from 'views/Snippets/Snippets';
	
export default (
<Route path="/" component={Workspace}>
  
  {/* Default route for root '/' path */}
  <Route path="demo" components={{sidebar: Markers, leftContent: Snippets, rightContent: Document}} />
  <IndexRedirect to='demo' />

</Route>
);