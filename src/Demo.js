import React, { Component } from 'react';
import Button from 'components/Button/Button';
import Snippet from 'components/Snippet/Snippet';

export default class Demo extends Component {
  render() {
    return (
    	<div>
        <h4><i className="icon-dossier-files"></i> Buttons Demo</h4>
        <hr />
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
        <Snippet />
      </div>
    );
  }
}
