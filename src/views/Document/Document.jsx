import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import SplitPane from 'react-split-pane';

import Button from 'components/Button/Button';

import styles from './Document.scss';

@inject('appState') @observer
class Document extends Component {
	render() {
		const { triggerViewerMode, dualScreen } = this.props.appState;
		return(
			<section>
				{( !dualScreen ?
					<section>
						<div className={styles.panel}>
							<header className={styles.header}>
								<span className={styles.title}>
									<i className='fa fa-fw fa-file-text' aria-hidden='true' />
									<h5>Document</h5>
								</span>
								<span className={styles.pin}>
								  <Button onAddClick={triggerViewerMode}><i className='fa fa-fw fa-thumb-tack' aria-hidden='true' /> Pin</Button>
								</span>
							</header>
							<div style={{padding:'1em'}}>
								more content
							</div>
						</div>
					</section>
					:
					<SplitPane size="50%">
						<section className={styles.leftContent}>
							<div className={styles.panel}>
								<header className={styles.header}>
									<span className={styles.title}>
										<i className='fa fa-fw fa-file-text' aria-hidden='true' />
										<h5>Application</h5>
									</span>
								</header>
								<div style={{padding:'1em'}}>
									more content
								</div>
							</div>
						</section>
						<section className={styles.rightContent}>
							<div className={`${styles.panel} ${styles.pinned}`}>
								<header className={styles.header}>
									<span className={styles.title}>
										<i className='fa fa-fw fa-file-text' aria-hidden='true' />
										<h5>Document</h5>
									</span>
									<span className={styles.pin}>
									  
									  <a onClick={triggerViewerMode}><i className='fa fa-2x fa-fw fa-times' aria-hidden='true' /></a>
									</span>
								</header>
								<div style={{padding:'1em'}}>
									<span style={{float: 'right'}}><i className='fa fa-fw fa-thumb-tack' aria-hidden='true' /> Pinned</span><br />
									more content
								</div>
							</div>
						</section>
					</SplitPane>

				)}
			</section>
		)
	}
}

export default Document;