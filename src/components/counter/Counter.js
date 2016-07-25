import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import Button from 'components/Button/Button';

@observer
class Counter extends Component {
  render() {
    return (
      <div>
        <Button onAddClick={this.onPlusClick}>
          Add +
        </Button>
        &nbsp;
        <Button onAddClick={this.onMinusClick}>
          Delete -
        </Button>
        Count: {this.props.counterStore.timer}
        <DevTools />
      </div>
    );
  }

  onMinusClick = () => {
    this.props.counterStore.minusClick();
  }

  onPlusClick = () => {
    this.props.counterStore.plusClick();
  }

};


export default Counter;