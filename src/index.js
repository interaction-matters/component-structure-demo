import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'components/Button/Button';
import Workspace from 'templates/workspace/Workspace';
import Demo from './Demo';
// Import all of our base styles
import styles from './app.scss';

export default class Index extends Component {
  render() {
    return (
    	<Workspace>		
    		<h4><i className="icon-dossier-files"></i> Buttons Demo</h4>
    		<hr />
    		<Demo />
      </Workspace>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
