import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class CheckboxSwitch extends Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired
  };
  static defaultProps = {
    mode: 'material', // material, ios, candy, holo
    label: '',
    isChecked: false,
    isDisabled: false
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor (props) {
    super(props);
    this.state = {
      isChecked: !!props.isChecked || false
    };
    this._handleChange = this._handleChange.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({isChecked: nextProps.isChecked});
  }

  _handleChange () {
    if (this.props.isDisabled) {
      return false;
    }
    this.props.handleClick();
    this.setState({isChecked: !this.state.isChecked});
  }

  render () {
    const styles = require('./CheckboxSwitch.css');
    let mode = 'switch-' + this.props.mode;
    return (
      <div className={styles.root} data-status={this.props.isDisabled ? 'disabled' : ''}>
        <strong>{this.props.label}</strong>
        <label
          onClick={this._handleClick}
          className={`${styles['switch-light']} ${styles[mode]}`}
        >
          <input type='checkbox' checked={this.state.isChecked} onChange={this._handleChange} disabled={this.props.isDisabled} />
          <span>
            <span title='Off' aria-label='Off'>O</span>
            <span title='On' aria-label='On'>I</span>
            <a></a>
          </span>
        </label>
      </div>
    );
  }
}
