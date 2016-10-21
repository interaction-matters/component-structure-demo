import React, { Component } from 'react';
import Button from 'components/Button/Button';
import Swatch from 'components/Swatch/Swatch';

export default class Demo extends Component {
  render() {
    return (
    	<div>
      	<Button type="default">Default</Button>&nbsp;
      	<Button type="primary">Primary</Button>&nbsp;
      	<Button type="success">Success</Button>&nbsp;
      	<Button type="info">Info</Button>&nbsp;
      	<Button type="warning">Warning</Button>&nbsp;
      	<Button type="danger">Danger</Button>
      	<hr />
      	<Button type="primary" size="small">Small Button</Button>&nbsp;
      	<Button type="warning">Button</Button>&nbsp;
      	<Button type="default" size="large">Large Button</Button>
      	<hr />
        <h1>Heading One</h1>
        <h2>Heading Two</h2>
        <h3>Heading Three</h3>
        <h4>Heading Four</h4>
        <h5>Heading Five</h5>
        <h6>Heading Six</h6>
        <hr />
        <Swatch name="Primary"></Swatch>
      </div>
    );
  }
}
