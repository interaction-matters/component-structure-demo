/***************
Component name
****************/

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

import styles from './style.scss';

@observer
class Navigation extends Component {
	render () {
		return (
			<div className={styles.navigation}>{this.props.navStore.timer}</div>
		)
	}
};

export default Navigation;