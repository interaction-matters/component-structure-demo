import React, { Component, PropTypes } from 'react';
import Loader from 'halogen/BeatLoader';

export default class Spinner extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  };
  render () {
    const isShown = this.props.loading ? {display: 'block'} : {display: 'none'};
    const styles = require('./Spinner.css');

    return (
      <div style={isShown} className={styles.spinner}>
        <Loader color='#e65100' />
      </div>
    );
  }
}
