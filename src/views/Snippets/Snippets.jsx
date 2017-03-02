import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import Button from 'components/Button/Button';

import styles from './Snippets.scss';

@inject('appState') @observer
class Snippets extends Component {
	render() {
		const { triggerViewerMode, dualScreen } = this.props.appState;
		return(
			<section>
				<header className={styles.header}>
					<span className={styles.title}>
						<i className='fa fa-fw fa-th-list' aria-hidden='true' />
					
						{( !dualScreen ?
							<h5>Results</h5>
							:
							''
						)}
					</span>
				</header>
				<div className={styles.panel}>
					  
				</div>
			</section>
		)
	}
}

export default Snippets;