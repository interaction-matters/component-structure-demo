import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import Button from 'components/Button/Button';

@observer
class Counter extends Component {
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.onReset}>
          Seconds passed: {this.props.counterStore.timer}
        </Button>
        <DevTools />
      </div>
    );
  }

  onReset = () => {
    this.props.counterStore.resetTimer();
  }
};

export default Counter;