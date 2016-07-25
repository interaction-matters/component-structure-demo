import React, { Component, PropTypes } from 'react';
import shallowCompare from 'utils/shallowCompare';
import {observer} from 'mobx-react';
import {MarkerHeader} from '../MarkerHeader/MarkerHeader';

/**
* MarkerBox - Generates a marker box.
*
* Properties:
* - marker:obj         -> MarkerModel object
* - bgcolor:str        -> Background colour
* - color:str          -> Foreground colour
* - historyLatest:obj  -> MarkerHistoryLatest object
* - isDirty:bool       -> TRUE when content differs from default content
* - isUsed:bool        -> TRUE if used in search
* - isValid:bool       -> TRUE if validated against backend service
* - name:str           -> MarkerModel object
* - title:str          -> MarkerModel object
* - defaultColors:obj  -> default colours for each one of every 26 possible markers
*
* Handlers:
* - editTitle(title:str)
* - editContent(content:str)
* - deleteMarker(marker:obj)
* - afterMarkerUpdate(id, content:str) -> trigger after update
*
*/
@observer
export class MarkerBox extends Component {
  static propTypes = {
    marker: PropTypes.object.isRequired,
    bgcolor: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    historyLatest: PropTypes.object.isRequired,
    isDirty: PropTypes.bool.isRequired,
    isUsed: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    defaultColors: PropTypes.object.isRequired,
    /* Functions */
    editTitle: PropTypes.func.isRequired,
    editContent: PropTypes.func.isRequired,
    validateContent: PropTypes.func.isRequired,
    deleteMarker: PropTypes.func.isRequired,
    /* Components */
    ImplicitInput: PropTypes.func.isRequired,
    Button: PropTypes.func.isRequired
  };

  shouldComponentUpdate = shallowCompare;

  constructor (props) {
    super(props);
    const history = props.historyLatest;
    const defaulContent = history.expanded ? history.expanded : history.content;
    this.timeout = null;
    this.state = {
      content: defaulContent,
      defaulContent: defaulContent
    };
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._synchronize = this._synchronize.bind(this);
  }

  _synchronize () {
    const {
      editContent
    } = this.props;
    if (this.state.defaulContent !== this.state.content) {
      this._clearTimeout();
      this.setState({defaulContent: this.state.content});

      editContent(this.state.content);
    }
  }

  _clearTimeout () {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  _handleKeyPress (e) {
    const {
      validateContent
    } = this.props;
    this.setState({content: e.target.value});
    this._clearTimeout();
    this.timeout = setTimeout(() => validateContent(this.state.content), 1000);
  }

  render () {
    const styles = require('./MarkerBox.css');
    const {
      marker,
      bgcolor,
      color,
      name,
      title,
      historyLatest,
      isDirty,
      isValid,
      defaultColors,
      editTitle,
      deleteMarker,
      ImplicitInput,
      Button
    } = this.props;

    // Depending on validity or invalid pql
    let boxStyle = `${styles.markerBox}`;
    if (isDirty) {
      boxStyle = `${boxStyle} ${styles.markerBoxDirty}`;
    }
    if (!isValid) {
      boxStyle = `${boxStyle} ${styles.markerBoxError}`;
    }
    return (
      <div className={boxStyle}>
        <MarkerHeader
          marker={marker}
          bgcolor={bgcolor}
          color={color}
          isDirty={isDirty}
          name={name}
          title={title}
          version={historyLatest.version}
          defaultColors={defaultColors}
          editTitle={editTitle}
          deleteMarker={deleteMarker}
          ImplicitInput={ImplicitInput}
          Button={Button}
         />
        <textarea
          className={styles.textarea}
          onChange={this._handleKeyPress}
          onBlur={this._synchronize}
          value={this.state.content}
        />
      </div>
    );
  }
}
