/***************
Component name
****************/

import React, { Component, PropTypes } from 'react';

import styles from './styles.scss';

class WidgetBox extends Component {
	render() {
		return(
      <div className={styles.widgetBox}>
  			<div className={styles.header}>
          {this.props.title}
  			</div>
        <div className={styles.widgetBody}>
          {this.props.children}
        </div>
      </div>
		);
	}
}

export default class FilterByInput extends Component {

  static propTypes = {
    title: React.PropTypes.string,
    dismissible: React.PropTypes.bool,
    data: React.PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      search:'',
      searchParams: false
    }
  }

  _updateSearch(e) {
    this.setState({search: e.target.value})
  }

  _modifySearch() {
    this.setState({searchParams:true})
  }

  render() {

    let filteredResults = this.props.data.filter(
      (item) => {
        item.title.indexOf(this.state.search) !== -1 ? return item : return
      }
    );

    let options = filteredResults.map((filterOption, i) => {
      return <li key={i} className={styles.listItem}>
                <input type="checkbox" onChange={this._modifySearch.bind(this)} className={styles.checkbox} />
                <span className={styles.title}>{filterOption.title}</span>
                <span className={styles.number}>{filterOption.number}</span>
             </li>
    });

    return (
  		<WidgetBox title={this.props.title} dismissible={true}>
        <div className={styles.inputArea}>
          <input type="text" />
        </div>
        <ul className={styles.list}>
          {options}
        </ul>
      </WidgetBox>
    );
  }

};