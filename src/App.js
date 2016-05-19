/*******************************
App
--------------------------------
Top level ‘controller’ component
********************************/

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, hashHistory, browserHistory} from 'react-router';

// Here, we import all of our base styles
import styles from './app.scss';

// Import route definitions from config > routes
import routes from 'config/routes';

ReactDOM.render(
	(<Router history={browserHistory} children={routes} />), 
	document.querySelector("#root")
);