import React, { Component } from 'react';
import Button from 'components/Button/Button';
import SplitPane from 'react-split-pane';
import {observer, inject} from 'mobx-react';
import { toJS } from 'mobx'

@inject('appState') @observer
class SplitScreen extends Component {
  render() {
    return(
      <div>
      {( this.props.appState.dualScreen ?
          <SplitPane split="vertical" defaultSize="50%">
            <div style={{padding:'1em'}}>
              more content
            </div>
            <div style={{padding:'1em'}}>
              <span style={{float: 'right'}}>
               <Button type="primary" onAddClick={this.props.appState.triggerViewerMode}>Pin document</Button>
              </span>
            </div>
          </SplitPane>
          :
          <div style={{padding:'1em'}}>
            more content
            <span style={{float: 'right'}}>
              <Button type="primary" onAddClick={this.props.appState.triggerViewerMode}>Pin document</Button>
            </span>
          </div>
      )};
      </div>
    )
  }
}

@inject('appState') @observer
export default class Demo extends Component {
 
  render() {
    //console.log('Demo', toJS(this.props.appState))

    const { toggleSize, panelSize, triggerViewerMode } = this.props.appState

    //console.log(toggleSize)

    return (
    	<div>
        <SplitPane split="vertical" size={panelSize}>
            <div style={{padding:'1em'}}>
              <h4><i className="icon-dossier-files"></i> Buttons Demo</h4>
              <hr />
              <Button type="default">Default</Button>&nbsp;
              <Button type="primary">Primary</Button>&nbsp;
              <Button type="success" onAddClick={triggerViewerMode}>Success</Button>&nbsp;
              <Button type="info">Info</Button>&nbsp;
              <Button type="warning">Warning</Button>&nbsp;
              <Button type="danger">Danger</Button>
              <hr />
              <Button type="primary" size="small">Small Button</Button>&nbsp;
              <Button type="warning">Button</Button>&nbsp;
              <Button type="default" size="large">Large Button</Button>
            </div>
            <SplitScreen />
        </SplitPane>
      </div>
    );
  }
}
