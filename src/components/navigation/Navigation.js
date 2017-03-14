/***************
Component name
****************/

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import styles from './style.scss';

const NavItem = ({ link, icon, ...props }) =>
  <Link to={link} activeClassName={styles.active} className={styles.navItem}
    {...props}>
    <i className={`icon-${icon}-icon`} />
    <span className={styles.name}>{props.name}</span>
  </Link>

export default class Navigation extends Component {
	render () {
		return (
			<div className={styles.navbar}>
				<NavItem key='epoque' name='epoque 2.0' link='/' icon='epoque2'>
		    </NavItem>
				<NavItem key='application' name='application' link='/application' icon='application' onlyActiveOnIndex>
		    </NavItem>
		    <NavItem key='query' name='query' link='/query' icon='query'>
		    </NavItem>
		    <NavItem key='library' name='library' link='/library' icon='library'>
		    </NavItem>
			</div>
		)
	}
};