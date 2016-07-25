import React, { Component, PropTypes } from 'react';
import shallowCompare from 'utils/shallowCompare';
import {observer} from 'mobx-react';
import {MarkerBox} from './MarkerBox/MarkerBox';

@observer
export class MarkersPanelHeader extends Component {
  render () {
    const styles = require('./Markers.css');
    return <div className={styles.markersPanelHeader}>Markers</div>;
  }
}

@observer
export default class Markers extends Component {
  static propTypes = {
    markers: PropTypes.object.isRequired,
    defaultColors: PropTypes.object.isRequired,
    /* Functions */
    addMarker: PropTypes.func.isRequired,
    deleteMarker: PropTypes.func.isRequired,
    /* Components */
    ImplicitInput: PropTypes.func.isRequired,
    Panel: PropTypes.func.isRequired,
    Button: PropTypes.func.isRequired
  };

  shouldComponentUpdate = shallowCompare;

  _renderMarkers () {
    if (!this.props.markers.length) {
      return;
    }

    const {
      ImplicitInput,
      Button
    } = this.props;

    return this.props.markers
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(marker => (
        <MarkerBox
          key={marker.id}
          marker={marker}
          bgcolor={marker.bgcolor}
          color={marker.color}
          historyLatest={marker.historyLatest}
          isDirty={marker.dirty}
          isUsed={marker.isUsed}
          isValid={marker.isValid}
          name={marker.name}
          title={marker.title}
          /* Handlers */
          editTitle={marker.editTitle}
          editContent={marker.editContent}
          validateContent={marker.validateContent}
          deleteMarker={this.props.deleteMarker}
          defaultColors={this.props.defaultColors}
          /* Components */
          ImplicitInput={ImplicitInput}
          Button={Button}
        />
      ));
  }

  render () {
    const styles = require('./Markers.css');

    const {
      Panel,
      Button
    } = this.props;

    return (
      <div className={styles.root}>
        {/* <ApplyMarkers /> */}
        <div className={styles.markersPanel}>
          <MarkersPanelHeader />
          <Panel bsStyle='default' className={`${styles.markersPanelBody}`}>
            {this._renderMarkers()}
            <Button
              onClick={this.props.addMarker}
              bsStyle='primary'
              className={`${styles.addMarkerButton} btn`}
              bsSize='small'
              block
            >
              <span className={styles.addMarker}>+</span>
            </Button>
          </Panel>
        </div>
      </div>
    );
  }
}
