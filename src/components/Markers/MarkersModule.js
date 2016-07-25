import React, {Component} from 'react';
import shallowCompare from 'utils/shallowCompare';
import {observer} from 'mobx-react';

/**
* Defaults from style config file
*/
import {markers as defaultColors} from 'stylesConfig';

/**
* Stores
*/
import MarkersStore from './MarkersStore';

/**
* Components
*/
import Markers from './components/Markers';
import ImplicitInput from 'components/ImplicitInput/ImplicitInput';
import {
  Button,
  Panel
} from 'react-bootstrap';

/**
* Module class
*/
@observer
export default class MarkersModule extends Component {
  shouldComponentUpdate = shallowCompare;

  render () {
    return (
      <Markers
        markers={MarkersStore.markers}
        defaultColors={defaultColors}
        /* Functions */
        addMarker={MarkersStore.addMarker}
        deleteMarker={MarkersStore.deleteMarker}
        /* Components */
        ImplicitInput={ImplicitInput}
        Button={Button}
        Panel={Panel}
      />
    );
  }
}
