import React from 'react';
import styles from './Markers.scss';
//import Marker from './Marker';

import { inject, observer } from 'mobx-react';

@inject('appState') @observer
class Markers extends React.Component {
	render() {

		const { dualScreen } = this.props.appState;

		return(
			<div className={styles.markers}>
				<header className={styles.header}>
					<span className={styles.title}>
						<i className='fa fa-fw fa-cubes' aria-hidden='true' />
					
						{( !dualScreen ?
							<h5>Markers</h5>
							:
							''
						)}
					</span>
				</header>
			</div>
		)
	}
}

export default Markers