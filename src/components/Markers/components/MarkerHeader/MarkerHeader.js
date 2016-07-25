import React, {Component, PropTypes} from 'react';
import shallowCompare from 'utils/shallowCompare';
import {observer} from 'mobx-react';

/**
* MarkerHeader - Generates header for marker box.
*
* Properties:
* - marker:obj         -> MarkerModel object
* - bgcolor:str        -> Background colour
* - color:str          -> Foreground colour
* - isDirty:bool       -> TRUE when content differs from default content
* - name:str           -> MarkerModel object
* - title:str          -> MarkerModel object
* - defaultColors:obj  -> default colours for each one of every 26 possible markers
*
* Handlers:
* - editTitle(title:str)
* - deleteMarker(marker:obj)
*
*/
@observer
export class MarkerHeader extends Component {
  static propTypes = {
    marker: PropTypes.object.isRequired,
    bgcolor: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    isDirty: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    version: PropTypes.number.isRequired,
    defaultColors: PropTypes.object.isRequired,
    /* Functions */
    editTitle: PropTypes.func.isRequired,
    deleteMarker: PropTypes.func.isRequired,
    /* Components */
    ImplicitInput: PropTypes.func.isRequired,
    Button: PropTypes.func.isRequired
  };

  shouldComponentUpdate = shallowCompare;

  render () {
    const styles = require('./MarkerHeader.css');

    const {
      marker,
      bgcolor,
      color,
      isDirty,
      name,
      title,
      version,
      editTitle,
      deleteMarker,
      ImplicitInput,
      Button
    } = this.props;

    const colours = {
      backgroundColor: bgcolor || this.props.defaultColors[name],
      color: color || this.props.defaultColors['text']
    };

    const dirty = isDirty ? '*' : ' ';

    return (
      <div className={styles.header}>
        <div className={styles.markerName}>
          <div style={colours} className={styles.colorIcon}>{name}</div>
          <ul>
            <li data-type='dirty'><span>{dirty}</span></li>
            <li data-type='version'><span>{version}</span></li>
          </ul>
        </div>
        <ImplicitInput
          value={title}
          handleChange={value => editTitle(value)}
          allowEmptyValue={false}
        />
        <Button
          onClick={() => deleteMarker(marker)}
          bsSize='small'
          bsStyle='danger'
        >x</Button>
      </div>
    );
  }
}
