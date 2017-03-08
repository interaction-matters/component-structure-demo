import React from 'react';
import styles from './Markers.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//import Marker from './Marker';
import MarkerActions from './MarkerActions';
import Panel from 'components/Panel/Panel';
import SlidePanel from 'components/SlidePanel/SlidePanel';
import Button from 'components/Button/Button';

import { inject, observer } from 'mobx-react';

@inject('appState') @observer
class Markers extends React.Component {
	render() {

		const { dualScreen, markerCollapse, collapseMarkers } = this.props.appState;

		Tabs.setUseDefaultStyles(false);

		return(
			<div>
				{( !markerCollapse ?
					<div className={styles.markers}>
						<header className={styles.header}>
							<span className={styles.title}>
								<i className='fa fa-fw fa-cubes' aria-hidden='true' />
								<h5>EP 12345 678 90</h5>
							</span>		
							<span className={`${styles.collapse} ${styles.open}`} onClick={collapseMarkers}>
								<i className='fa fa-fw fa-chevron-left' aria-hidden='true' />
							</span>
						</header>
						<Tabs>
							<TabList>
	              <Tab>Session 1</Tab>
	              <Tab>Session 2</Tab>
	              <li className={styles.addMarker}><i className='fa fa-fw fa-plus' aria-hidden='true' /></li>
	            </TabList>
	            <TabPanel>
	            	<MarkerActions />
	            	<div style={{padding:'1.5em'}}>
		            	<SlidePanel title="Marker Query" visibility="visible">
		            		<Panel header="Marker A" />
		            		<Panel header="Marker B" />
		            		<Panel header="Marker C" />
		            		<Panel header="Marker D" />
		            	</SlidePanel>
			            <Button type="default">Add additional query +</Button>
	            	</div>
	            </TabPanel>
	            <TabPanel>
	            	<MarkerActions />
	            		<div style={{padding:'1.5em'}}>
	            			No session information available
	            		</div>
	            </TabPanel>
						</Tabs>			
					</div>
					:
					<div className={styles.markers}>
						<header className={styles.header}>
							<span className={styles.title}>
								<i className='fa fa-fw fa-cubes' aria-hidden='true' />
							</span>
						</header>
						<span className={`${styles.collapse} ${styles.closed}`} onClick={collapseMarkers}>
							<i className='fa fa-fw fa-chevron-right' aria-hidden='true' />
						</span>
					</div>
				)}
			</div>	
		)
	}
}

export default Markers