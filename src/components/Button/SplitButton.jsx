/**************
A Split Button
---------------
For dropdowns
***************/

import React, { Component } from 'react';
import Button from 'components/Button/Button';
import styles from './styles.scss';

export default class SplitButton extends Component {

	constructor(props) {
     super(props);
     /* Set initial slide content to hidden */
     this.state = {toggle: 'off'};
  }

	render() {

		function toggl() {
			this.state.toggle === 'off'
			? this.setState({toggle: 'on'})
			: this.setState({toggle: 'off'})
		}

		const toggleState = {
			toggle: this.state.toggle
		}

    let focus;
    this.state.toggle === 'on'
      ? focus = styles.hasFocus
      : focus = ""
    
    return (
    	<div className={styles.splitButton}>
    		<Button {...this.props}>
    			{this.props.title}
    		</Button>
    		<Button {...this.props} onAddClick={toggl.bind(this)}>
    			<span className={styles.caret}></span>
    		</Button>
    		{/* Pass down toggle state as props */}
    		{ React.cloneElement(this.props.children, {...toggleState}) }
    	</div>
    	
    );

  }

};

SplitButton.defaultProps = {
  role: 'button',
  type: 'default',
  iconOnly: false
}
