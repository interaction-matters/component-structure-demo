import React from 'react';
import styles from './Markers.scss';

import DropDownButton from 'components/Button/DropDownButton';
import DropDownPanel from 'components/DropDownPanel/DropDownPanel';
import DropDownList from 'components/DropDownList/DropDownList';
import Button from 'components/Button/Button';

class MarkerActions extends React.Component {

	constructor(props) {
     super(props);
     this.state = {title: 'All Databases'};
  }

	render() {

		const {menuItems} = this.props;

		function changeTitle(e) {
			//console.log("Added: " + e.target.innerText);
			this.setState({title: e.target.innerText})
		}

		return(
			<div className={styles.markerActions}>
				<span className={styles.dropdown}>
					<DropDownButton title="dropdown" type="default" title={this.state.title}>
            <DropDownPanel>
              <DropDownList onAddClick={changeTitle.bind(this)} menuItems={menuItems} />
            </DropDownPanel>
          </DropDownButton>
				</span>
			</div>
		)
	}
}

export default MarkerActions;