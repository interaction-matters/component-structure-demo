import React from 'react';
import styles from './Markers.scss';

import DropDownButton from 'components/Button/DropDownButton';
import DropDownPanel from 'components/DropDownPanel/DropDownPanel';
import MenuList from 'components/MenuList/MenuList';
import Button from 'components/Button/Button';

class MarkerActions extends React.Component {
	render() {

		const menuItems = [
			{text:"All databases", target: "", icon: "database"}, 
			{text:"Patent Literature", target: ""}, 
			{text:"Non-patent Literature", target: ""}
		]

		return(
			<div className={styles.markerActions}>
				<span className={styles.dropdown}>
					<DropDownButton title="dropdown" type="default" title="Search on">
            <DropDownPanel>
              <MenuList menuItems={menuItems} />
            </DropDownPanel>
          </DropDownButton>
				</span>
				<span style={{float:'right'}}>
					<button className={styles.search}>
						<i className="fa fa-search" aria-hidden="true"></i>&nbsp;Search
					</button>
				</span>
			</div>
		)
	}
}

export default MarkerActions;