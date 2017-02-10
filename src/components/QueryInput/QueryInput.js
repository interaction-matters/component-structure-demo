import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './QueryInput.scss';

export default class QueryInput extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	query: 'inactive'
		}
	}

	clickHandler(e) {
		e.currentTarget.style.border = "1px solid red";
		console.log(e.target);
		console.log(e.currentTarget);
		console.log(ReactDOM.findDOMNode(this));
	}

  	render() {

  		let activeClass = {
  			border: "1px solid red"
  		}

	    return (
			<div className={styles.query}>
				<span className={styles.term}>Pizza<span style={{color: "magenta"}}>+</span></span> 
				<span className={styles.proximity} style={{color: "blue"}}>3d</span>
				<span className={styles.brackets} >
					<span className={styles.bracket} style={{color: "green"}} onMouseEnter={this.clickHandler.bind(this)}>(</span>
						<span className={styles.term}>oregano<span style={{color: "magenta"}}>?</span></span>
						<span className={styles.proximity} style={{color: "blue"}}>2d</span>
						<span className={styles.term}>basil<span style={{color: "magenta"}}>+</span></span>
					<span className={styles.bracket} style={{color: "green"}} onMouseEnter={this.clickHandler.bind(this)}>)</span>
				</span>
			</div>
			)
	}
};