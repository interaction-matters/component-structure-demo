import React, { Component, PropTypes } from 'react';
import shallowCompare from 'utils/shallowCompare';
import styles from './ImplicitInput.css';

export default class ImplicitInput extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    handleChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    allowEmptyValue: PropTypes.bool
  };

  static defaultProps = {
    allowEmptyValue: true
  };

  shouldComponentUpdate = shallowCompare;

  constructor (props) {
    super(props);
    this.state = {
      value: props.value,
      defaultValue: props.value
    };
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._synchronize = this._synchronize.bind(this);
  }

  componentWillReceiveProps (props) {
    if (this.state.value !== props.value) {
      this.setState({value: props.value});
    }
  }

  _handleKeyPress (e) {
    const ENTER = 13;
    if (e.charCode === ENTER || e.keyCode === ENTER) {
      e.target.blur();
    } else {
      this.setState({value: e.target.value});
    }
  }

  _synchronize () {
    if (!this.props.allowEmptyValue && this.state.value === '') {
      this.setState({value: this.state.defaultValue});
    } else if (this.state.defaultValue !== this.state.value) {
      this.props.handleChange(this.state.value);
      this.setState({defaultValue: this.state.value});
    }
  }

  render () {
    return (
      <input
        type='text'
        disabled={this.props.disabled}
        className={styles.input}
        placeholder={this.props.placeholder || null}
        value={this.state.value}
        onChange={this._handleKeyPress}
        onKeyUp={this._handleKeyPress}
        onBlur={this._synchronize}
      />
    );
  }
}
