import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class Profiler extends Component {
  constructor (props) {
    super(props);
    this._toggleProfiler = this._toggleProfiler.bind(this);
    this.state = {profiling: false};
    this.perf = null;

    if (__DEV__) {
      this.perf = require('react-addons-perf');
    }
  }

  _toggleProfiler () {
    if (!this.perf) {
      return null;
    }

    if (!this.state.profiling) {
      this.perf.start();
    } else {
      this.perf.stop();
      this.perf.printInclusive();
      this.perf.printWasted();
    }

    this.setState({profiling: !this.state.profiling});
  }

  render () {
    return (
      <Button
        style={styles.root}
        bsStyle={this.state.profiling ? 'danger' : 'success'}
        onClick={this._toggleProfiler}
      >
        {this.state.profiling ? 'stop' : 'start'} profiler
      </Button>
    );
  }
}

const styles = {
  root: {
    position: 'absolute',
    top: 0,
    right: '50%',
    zIndex: 9999
  }
};
