/******************
Slide Panel
-------------------
A sliding panel
component, which
toggles open/closed
on a trigger event
*******************/

import React, { Component, PropTypes } from 'react';

import styles from './SlidePanel.scss';

export default class SlidePanel extends Component {

	constructor(props) {
     super(props);
     /* Set initial slide content to hidden */
     this.state = {visibility: this.props.visibility};
  }

  render() {
  	/* 
  	** Check current state, and switch
  	** to toggle slide visibility
  	*/
  	function toggl() {
  		this.state.visibility === 'hidden'
  			? this.setState({visibility: 'visible'})
  			: this.setState({visibility: 'hidden'})
  	}
  	/*
  	** Toggle class of 'is-open' to
  	** display the slide content
  	*/
  	let className, style;
  	this.state.visibility === 'hidden'
  		? className = styles.slidePanel
  		: (className = `${styles.slidePanel} ${styles.isOpen}`, style = { maxHeight: this.props.height + 'px'})

    return (
    	<div>
        <span className={styles.title}>
          <h5>{this.props.title}</h5>
      		<a onClick={toggl.bind(this)} className={styles.trigger}>&nbsp;{this.props.message}</a>
        </span>
    		<div className={className} style={style}>
    			{this.props.children}
    		</div>
    	</div>
    );
  }

};

SlidePanel.propTypes = {}

SlidePanel.defaultProps = {
	height:500,
  visibility: "hidden"
}
