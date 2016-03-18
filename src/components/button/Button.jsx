/*****************************
A (really) Basic Button
******************************/

import React, { Component } from 'react';
import ClassNames from 'classnames';
import styles from './styles.scss';

export default class Button extends Component {

  static propTypes = {
    type: React.PropTypes.string,
    role: React.PropTypes.string,
    width: React.PropTypes.string,
    size: React.PropTypes.string,
    focus: React.PropTypes.string,
  };

  static defaultProps = {
    role: 'button',
    type: 'default'
  };

  render() {

    // Type of button [default, primary, warning, success, info, link, delete]
    let type = this.props.type ? styles[this.props.type] : null;
    // Role (html attribute 'type') of button [button, reset, submit]
    let role = this.props.role ? styles[this.props.role] : null;
    // Width of button [default, wide, fluid]
    let width = this.props.width ? styles[this.props.width] : null;
    // Size of button [small, smallest, default, large, largest]
    let size = this.props.size ? styles[this.props.size] : null;
    // Focus
    let focus = this.props.focus ? styles[this.props.focus] : null;

    // ClassNames utility combines classes and removes any falsey values
    let style = ClassNames(type, role, width, size, focus);
    
    return (

      this.props.disabled == true ? <button type={role} onClick={this.props.onAddClick} className={styles.button} disabled><span className="ui-button__inner">{this.props.children}</span></button> : 
                           <button type={role} onFocus={this.props.onAddFocus} onBlur={this.props.onAddBlur} onClick={this.props.onAddClick} className={style}><span className="ui-button__inner">{this.props.children}</span></button>
    );

  }

};