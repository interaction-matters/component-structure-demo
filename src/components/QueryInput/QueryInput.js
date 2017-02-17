import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './QueryInput.scss';


const activeClass = {
	border: "1px solid red"
}


export default class QueryInput extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	activeArea: ''
		}
	}

	toggleActiveArea(e) {
		let id = e.target.getAttribute("data-target");
		this.setState({activeArea: id});
		let activeElement = document.getElementById(id);
		activeElement.setAttribute("style", activeClass);

		console.log("activeElement:" + activeElement);
		console.log("id: " + id);
		console.log("active state: " + this.state.activeArea);
	}

  	render() {

	    return (
			<div className={styles.query}>
				<span className={styles.term} data-target="term1" id="term1">Pizza<span style={{color: "magenta"}}>+</span></span> 
				<span className={styles.proximity} style={{color: "blue"}}>3d</span>
				<span className={styles.brackets} id="brackets">
					<span className={styles.bracket} data-target="brackets" style={{color: "green"}} 
						  onMouseEnter={this.toggleActiveArea.bind(this)}
						  >(</span>
						<span className={styles.term} data-target="term2" id="term2" onMouseEnter={this.toggleActiveArea.bind(this)}>oregano<span style={{color: "magenta"}}>?</span></span>
						<span className={styles.proximity} style={{color: "blue"}} onMouseEnter={this.toggleActiveArea.bind(this)}>2d</span>
						<span className={styles.term} data-target="term3" id="term3">basil<span style={{color: "magenta"}} onMouseEnter={this.toggleActiveArea.bind(this)}>+</span></span>
					<span className={styles.bracket} style={{color: "green"}} onMouseEnter={this.toggleActiveArea.bind(this)}>)</span>
				</span>
			</div>
			)
	}
};