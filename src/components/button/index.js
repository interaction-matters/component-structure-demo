/*****************************
A (really) Basic Button
******************************/

import React, { Component } from 'react';
import Button from './Button'
import theme from './button.scss';

class ButtonFactory extends Component {
	render() {
		return(
			<Button theme={theme} {...this.props} />
		)
	}
} 

export {ButtonFactory as Button};
export default Button;