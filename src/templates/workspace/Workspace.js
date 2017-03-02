import React, { Component } from 'react';
import Navigation from 'components/navigation/Navigation';
import {observer, inject, Provider} from 'mobx-react';
import AppState from 'AppState';

import SplitPane from 'react-split-pane';

import Button from 'components/Button/Button';

import styles from './styles.scss';

@inject('appState') @observer
class Workspace extends Component {
  render() {

    const { markerCollapse, collapseMarkers, dualScreen, panelSize, pinnedItemsCollapse } = this.props.appState;

    return(
      <div className={styles.wrapper}>
        <section className={styles.left}>
          <Navigation />
        </section>
        {(markerCollapse ?
          <section className={`${styles.markers} ${styles.collapsed}`}>
            {React.cloneElement(this.props.sidebar, { styles })}
          </section>
          :
          <section className={styles.markers}>
            {React.cloneElement(this.props.sidebar, { styles })}
          </section>
        )}
        
        <section className={styles.main}>
          <SplitPane split="vertical" size={panelSize}>
            <section className={styles.leftContent}>
              {React.cloneElement(this.props.leftContent, { styles })}
            </section>
            <section className={styles.rightContent}>
              {React.cloneElement(this.props.rightContent, { styles })}
            </section>
          </SplitPane>
          {/* {this.props.children} */}
        </section>
        {(!pinnedItemsCollapse ?
          <section className={`${styles.right} ${styles.collapsed}`}>
            &nbsp;
          </section>
          :
          <section className={styles.right}>
            &nbsp;
          </section>
        )}
      </div>
    )
  }
}

export default Workspace;