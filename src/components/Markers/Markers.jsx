import React from 'react';
import styles from './Markers.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//import Marker from './Marker';
import MarkerActions from './MarkerActions';
import Panel from 'components/Panel/Panel';
import DropDownPanel from 'components/DropDownPanel/DropDownPanel';
import DropDownList from 'components/DropDownList/DropDownList';
import SlidePanel from 'components/SlidePanel/SlidePanel';
import Button from 'components/Button/Button';
import SplitButton from 'components/Button/SplitButton';

import { inject, observer } from 'mobx-react';

@inject('appState') @observer
class Markers extends React.Component {
	render() {

		const { dualScreen, markerCollapse, collapseMarkers } = this.props.appState;

		Tabs.setUseDefaultStyles(false);

		const epNos = [
			{text:"EP 12345 678 90"}, 
			{text:"EP 12345 678 90"}, 
			{text:"EP 12345 678 90"}
		]

		const menuItems = [
			{text:"All Databases"}, 
			{text:"Patent Literature"}, 
			{text:"Non-Patent Literature"}
		]

		return(
			<div>
				{( !markerCollapse ?
					<div className={styles.markers}>
						<span className={`${styles.collapse} ${styles.open}`} onClick={collapseMarkers}>
							<i className='fa fa-fw fa-chevron-left' aria-hidden='true' />
						</span>
						<header className={styles.header}>
							<span className={styles.title}>
								<SplitButton title="EP 12345 678 90" type="default">
			            <DropDownPanel>
			              <DropDownList menuItems={epNos} />
			            </DropDownPanel>
			          </SplitButton>
							</span>
							<span className={styles.cta}>
								<Button type="primary" size="large">
									<i className='fa fa-fw fa-search' aria-hidden='true' />
									&nbsp;Search
								</Button>
							</span>				
						</header>
						<Tabs>
							<TabList>
	              <Tab>Session 1</Tab>
	              <Tab>Session 2</Tab>
	              <li className={styles.addMarker}><i className='fa fa-fw fa-plus' aria-hidden='true' /></li>
	            </TabList>
	            <TabPanel>
	            	<MarkerActions menuItems={menuItems} />
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
						<span className={`${styles.collapse} ${styles.open}`} onClick={collapseMarkers}>
							<i className='fa fa-fw fa-chevron-right' aria-hidden='true' />
						</span>
					</div>
				)}
			</div>	
		)
	}
}

export default Markers