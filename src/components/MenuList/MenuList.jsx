/************************
Menu 
-------------------------
A component for creating
a simple menu, comprising
a series of links
*************************/

import React, { Component } from 'react';

import styles from './MenuList.scss';

import { Link } from 'react-router';

export default class MenuList extends Component {

  render() {

  	// Set menu placement
  	var menuPlacement = this.props.menuPlacement;
  	// Get menu items in menu
  	var menuItems = this.props.menuItems.map((menuItem, index) => {
      return <li key={index} className={styles.item}>
      					<Link to={menuItem.target}>
                  {(menuItem.icon ? 
                    <i className={"fa fa-" + menuItem.icon} />
                    : ''
                  )}
      						{menuItem.text}
      					</Link>
      			 </li>
    });

    return (
			<ul className={styles.menu}>
        {menuItems}
      </ul>
    );
  }

};
