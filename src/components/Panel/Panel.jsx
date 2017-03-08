/************
A basic panel
*************/

import React, { Component } from 'react';

import styles from './Panel.scss';

export default class Panel extends Component {

	static defaultProps = {
    panelType: 'default'
  };

  render() {

  	let panelType;
  	this.props.panelType ? panelType = this.props.panelType : null

    return (
			<div className={`${styles.panel} ${styles[panelType]}`}>
				{(this.props.header
					? <div className={styles.header}>
							{this.props.header}
						</div>
					: null
				)}
				<div className={styles.inner}>{this.props.children}</div>
			</div>	
    );
  }

};
