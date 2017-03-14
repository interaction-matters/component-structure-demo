/************************
Dropdown List 
-------------------------
A component for creating
a simple list, comprising
a series of anchor tags
*************************/

import React, { Component } from 'react';

import styles from './DropDownList.scss';

export default class DropDownList extends Component {

  render() {

  	// Get menu items in menu
  	var menuItems = this.props.menuItems.map((menuItem, index) => {
      return <li key={index} className={styles.item}>
      					<a onClick={this.props.onAddClick}>
                  {(menuItem.icon ? 
                    <i className={"fa fa-" + menuItem.icon} />
                    : ''
                  )}
      						{menuItem.text}
      					</a>
      			 </li>
    });

    return (
			<ul className={styles.list}>
        {menuItems}
      </ul>
    );
  }

};