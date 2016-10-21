/*******************************
Swatch component for style guide
********************************/

import React, { Component } from 'react';
import ClassNames from 'classnames';
import styles from './styles.scss';

class Swatch extends Component {

	static propTypes = {
		name: React.PropTypes.string,
		color: React.PropTypes.string,
		hex: React.PropTypes.string,
		rgb: React.PropTypes.string,
		cmyk: React.PropTypes.string
	};

	static defaultProps = {
		name: 'Colour',
		color:'-',
		hex: '-',
		rgb: '-',
		cmyk: '-'
	};

	render() {
		return (
			<div className={styles.root}>
				<div className={styles.swatch}></div>
				<div className={styles.meta}>
					<h4>{this.props.name}</h4>
					
					<span>Hex: {this.props.hex}</span>
					<span>RGB: {this.props.rgb}</span>
					<span>CMYK: {this.props.cmyk}</span>
				</div>
			</div>
		)
	}
};

export default Swatch;