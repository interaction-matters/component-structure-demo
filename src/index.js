/*******************************
App
--------------------------------
Top level ‘controller’ component
********************************/

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, hashHistory, browserHistory} from 'react-router';
import AppState from './AppState';
import { Provider } from 'mobx-react';

// Here, we import all of our base styles
import styles from './app.scss';

// Import route definitions from config > routes
import routes from 'config/routes';

const appState = window.app = new AppState();

ReactDOM.render(
	(<Provider appState={appState}>
		<Router history={browserHistory} children={routes} />
	 </Provider>), 
	document.querySelector("#root")
);