/*******************************
Root Container
--------------------------------
Defines scaffolding for our app
********************************/

import React, {Component} from 'react';

{/* This is the root-level '/' route. */}
export default class Root extends Component {
	render() {
		return (
			<div className="App">
				{this.props.children}
			</div>
		);
	}
}