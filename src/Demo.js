import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Button from 'components/Button/Button';
import Counter from 'components/counter/Counter';
import CounterStore from 'components/counter/CounterStore';

@observer
class ButtonGroup extends Component {
  render() {
    return (
      <div>
        <Button type="default">Default {this.props.buttonStore.timer}</Button>&nbsp;
        <Button type="primary">Primary</Button>&nbsp;
        <Button type="success">Success</Button>&nbsp;
        <Button type="info">Info</Button>&nbsp;
        <Button type="warning">Warning</Button>&nbsp;
        <Button type="danger">Danger</Button>
      </div>
    );
  }
}

export default class Demo extends Component {

  render() {

    const store = new CounterStore();

    return (
    	<div>
        <h4><i className="icon-dossier-files"></i> Buttons Demo</h4>
        <hr />
      	<ButtonGroup buttonStore={store} />
      	<hr />
      	<Button type="primary" size="small">Small Button</Button>&nbsp;
      	<Button type="warning">Button</Button>&nbsp;
      	<Button type="default" size="large">Large Button</Button>
      	<hr />
        <Counter counterStore={store} />
      </div>
    );
  }
}
