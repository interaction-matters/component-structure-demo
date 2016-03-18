import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from 'components/Button/Button';
import Demo from './Demo';
// Import all of our base styles
import styles from './app.scss';

export default class App extends Component {
  render() {
    return (
    	<div>
      	<h4>Buttons Demo</h4>
      	<hr />
      	<Demo />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
