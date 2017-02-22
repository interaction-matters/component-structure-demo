import React, { Component } from 'react';
import Navigation from 'components/navigation/Navigation';
import {observer, inject, Provider} from 'mobx-react';
import AppState from 'AppState';
import styles from './styles.scss';

@inject('appState') @observer
class Workspace extends Component {
  render() {

    const { dualScreen, panelSize, markerCollapse } = this.props.appState;

    console.log("markerCollapse: " + markerCollapse);

    return(
      <div className={styles.wrapper}>
        <section className={styles.left}>
          <Navigation />
        </section>
        {(markerCollapse ?
          <section className={`${styles.markers} ${styles.collapsed}`}>
            &nbsp;
          </section>
          :
          <section className={styles.markers}>
            &nbsp;
            {markerCollapse}<br />
            {dualScreen}<br />
            {panelSize}
          </section>
        )}
        
        <section className={styles.main}>
          {this.props.children}
        </section>
        <section className={styles.right}>
          &nbsp;
        </section>
      </div>
    )
  }
}

export default Workspace;