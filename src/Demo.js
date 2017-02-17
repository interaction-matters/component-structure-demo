import React, { Component } from 'react';
import Button from 'components/Button/Button';
import SplitPane from 'react-split-pane';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      panelSize: '50%',
      dualScreen: false
    }
  }

  _toggleSize() {
    this.setState({
      panelSize: '20%', 
      dualScreen: true
    });
    console.log(this.state.dualScreen);
  }

  render() {

    return (
    	<div>
        <SplitPane split="vertical" defaultSize={this.state.panelSize}>
            <div style={{padding:'1em'}}>
              <h4><i className="icon-dossier-files"></i> Buttons Demo</h4>
              <hr />
              <Button type="default">Default</Button>&nbsp;
              <Button type="primary">Primary</Button>&nbsp;
              <Button type="success" onAddClick={this._toggleSize.bind(this)}>Success</Button>&nbsp;
              <Button type="info">Info</Button>&nbsp;
              <Button type="warning">Warning</Button>&nbsp;
              <Button type="danger">Danger</Button>
              <hr />
              <Button type="primary" size="small">Small Button</Button>&nbsp;
              <Button type="warning">Button</Button>&nbsp;
              <Button type="default" size="large">Large Button</Button>
            </div>
            {( this.state.dualScreen ?
                <SplitPane split="vertical" defaultSize="50%">
                  <div style={{padding:'1em'}}>
                    more content
                  </div>
                  <div style={{padding:'1em'}}>
                    Even more content
                  </div>
                </SplitPane>
                :
                <div style={{padding:'1em'}}>
                  more content
                </div>
            )};
        </SplitPane>
      </div>
    );
  }
}
