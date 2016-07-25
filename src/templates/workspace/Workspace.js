import React, { Component } from 'react';
import Navigation from 'components/navigation/Navigation';
import styles from './styles.scss';
// Stores
import CounterStore from 'components/counter/CounterStore';

export default class Workspace extends Component {
  render() {

    const store = new CounterStore();

    return (
    	<div className={styles.wrapper}>
    		<section className={styles.left}>
          <Navigation navStore={store} />
        </section>
    		<section className={styles.main}>
    			{React.cloneElement(this.props.children, {store:store})}
      	</section>
      	<section className={styles.right}>
      		&nbsp;
      	</section>
      </div>
    );
  }
}