/*****************************
A (really) Basic Button
******************************/

import React, { Component } from 'react';
import ClassNames from 'classnames';

export default class Button extends Component {

  static propTypes = {
    theme: React.PropTypes.any,
    type: React.PropTypes.string,
    role: React.PropTypes.string,
    width: React.PropTypes.string,
    size: React.PropTypes.string,
    focus: React.PropTypes.string,
    className: React.PropTypes.string
  };

  static defaultProps = {
    role: 'button',
    type: 'default',
    className: 'btn'
  };

  render() {
    const {theme, type, role, width, size, focus, className} = this.props;
    // Type of button [default, primary, warning, success, info, link, delete]
    let typeClass = theme ? theme[type] : null;
    // Role (html attribute 'type') of button [button, reset, submit]
    let roleClass = theme ? theme[role] : null;
    // Width of button [default, wide, fluid]
    let widthClass = theme ? theme[width] : null;
    // Size of button [small, smallest, default, large, largest]
    let sizeClass = theme ? theme[size] : null;
    // Focus
    let focusClass = theme ? theme[focus] : null;

    // ClassNames utility combines classes and removes any falsey values
    let style = ClassNames(className, typeClass, roleClass, widthClass, sizeClass, focusClass);
    
    return (

      this.props.disabled == true ? <button type={role} onClick={this.props.onAddClick} className={styles.button} disabled><span className="ui-button__inner">{this.props.children}</span></button> : 
                           <button type={role} onFocus={this.props.onAddFocus} onBlur={this.props.onAddBlur} onClick={this.props.onAddClick} className={style}><span className="ui-button__inner">{this.props.children}</span></button>
    );

  }

};