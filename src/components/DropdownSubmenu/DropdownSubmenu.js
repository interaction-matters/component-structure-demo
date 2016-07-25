import { Component, PropTypes } from 'react';
import { Dropdown } from 'react-bootstrap';

const styles = require('./DropdownSubmenu.css');

export default class DropdownSubmenu extends Component {
	static propTypes = {
		label: PropTypes.string.isRequired
	};

	constructor (props) {
		super(props);

		this.state = {
			isOpen: false
		};
	}

	handleMouseEnter () {
		this.setState({ isOpen: true });
	}

	handleMouseLeave () {
		this.setState({ isOpen: false });
	}

	render () {
		let classNames = [
			styles.root,
			this.state.isOpen ? 'open' : ''
		];
		return (
			<li className={ classNames.join(' ') } 
				onMouseEnter = { this.handleMouseEnter.bind(this) }
				onMouseLeave = { this.handleMouseLeave.bind(this) }
			>
				<a className={ styles['label'] }>{ this.props.label }</a>
				<Dropdown.Menu 
					pullRight = { true }
					className = { styles['dropdown-menu'] }
				>
					{ this.props.children }
				</Dropdown.Menu>
			</li>
		);
	}
}