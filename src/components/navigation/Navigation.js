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
    <i className={`fa fa-fw fa-${icon}`} />
    {props.children}
  </Link>

export default class Navigation extends Component {
	render () {
		return (
			<div className={styles.navbar}>
				<NavItem key='application' link='/application' icon='file-text' onlyActiveOnIndex>
		    </NavItem>
		    <NavItem key='query' link='/query' icon='cubes'>
		    </NavItem>
		    <NavItem key='library' link='/library' icon='bookmark'>
		    </NavItem>
			</div>
		)
	}
};