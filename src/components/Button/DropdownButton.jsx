/**************
Dropdown Button
---------------
For dropdowns
***************/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import styles from './styles.scss';

export default class DropdownButton extends Component {

	constructor(props) {
     super(props);
     this.state = {
      toggle: this.props.toggle
     };
     this.handleFocus = this.handleFocus.bind(this);
  }

  handleFocus(e) {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      this.setState({toggle: 'off'});
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.handleFocus, false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleFocus, false);
  }

	render() {

		function toggl() {
			this.state.toggle === 'off'
			? this.setState({toggle: 'on'})
			: this.setState({toggle: 'off'})
		}

    function togglOff() {
      this.setState({toggle: 'off'})
    }

		const toggleState = {
			toggle: this.state.toggle
		}

    let focus;
    this.state.toggle === 'on'
      ? focus = "hasFocus"
      : focus = ""

    return (
    	<div className={styles.dropdownButton}>
    		<Button {...this.props} focus={focus} onAddClick={toggl.bind(this)}>
    			{this.props.title}
          <span className={styles.caret}></span>
         
    		</Button>
        {/* Pass down toggle state as props */}
        { React.cloneElement(this.props.children, {...toggleState}) }
    	</div>
    	
    );

  }

};

DropdownButton.defaultProps = {
  role: 'button',
  type: 'default',
  toggle: 'off'
}
