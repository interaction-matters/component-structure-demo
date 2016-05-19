import React, { Component } from 'react';
import Navigation from 'components/navigation/Navigation';
import styles from './styles.scss';

export default class Workspace extends Component {
  render() {
    return (
    	<div className={styles.wrapper}>
    		<section className={styles.left}>
          <Navigation />
        </section>
    		<section className={styles.main}>
    			{this.props.children}
      	</section>
      	<section className={styles.right}>
      		&nbsp;
      	</section>
      </div>
    );
  }
}