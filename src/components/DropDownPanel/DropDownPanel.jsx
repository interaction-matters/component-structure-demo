/***************
Drop Down Panel
****************/

import React, { Component, PropTypes } from 'react';
import styles from './DropDownPanel.scss';

export default class DropDownPanel extends Component {

  render() {
  	/*
  	** Toggle class of 'is-open' to
  	** display the dropdown content
  	*/
  	let className;
  	this.props.toggle === 'off'
  		? className = styles.dropdownPanel
  		: className = `${styles.dropdownPanel} ${styles.isOpen}`

    return (
    	<div className={className}>
    		{this.props.children}
    	</div>
    );
  }

};

DropDownPanel.propTypes = {}

DropDownPanel.defaultProps = {}