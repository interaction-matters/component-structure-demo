import { observable, computed, reaction, action } from 'mobx';

/**
 * API functions
 */
import {
  initMarkersAPI,
  addMarkerAPI,
  deleteMarkerAPI,
  updateMarkersAPI
} from './MarkersAPI';

/**
 * Models
 */
import MarkerModel from './models/MarkerModel';

/**
 * Fetch marker colours from config.
 */
import {markers as markerColors} from 'stylesConfig';

/**
 * Store for Markers.
 *
 * @class MarkersStore
 */
class MarkersStore {
  @observable markers;
  username;
  contentChanged;
  markerNames;
  @observable hasInvalidMarkers;
  isBatchUpdate;

  /**
   * Creates an instance of MarkersStore.
   */
  constructor () {
    /**
     * @type {MarkerModel[]} markers - Collection of markers.
     */
    this.markers = [];
    /**
     * @type {string} username
     */
    this.username = '';
    /**
     * @type {Observable} contentChanged
     */
    this.contentChanged = observable('');
    /**
     * @type {string} markerNames - Different names available for markers, 26 in total.
     */
    this.markerNames = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    /**
     * @type {boolean} hasInvalidMarkers - Observable variable set to TRUE when one of the markers in the collection is invalid.
     */
    this.hasInvalidMarkers = false;
    /**
     * @type {boolean} isBatchUpdate - If set to TRUE, autorun effects are inactive.
     */
    this.isBatchUpdate = false;

    // observe changes to markers collection
    this.markers.observe(changes => {
      // notify contentChanged when a marker is removed from collection
      if (changes.removed.length) {
        this._setContentChanged();
      }
      // reorder markers collection when a marker is removed
      if (!this.isBatchUpdate) {
        this._renameMarkers(changes);
      }
    });
    // check if markers collection contains invalid marker(s)
    reaction(
      () => this.markers.find(marker => marker.isValid === false) !== null,
      hasInvalidMarkers => { this.hasInvalidMarkers = hasInvalidMarkers; }
    );
  }

  /**
   * Return a collection of all non-empty markers and their respective content.
   *
   * @type {{[name]: string}} markersByContent
   * @return {{[name]: string}}
   */
  @computed get markersByContent () {
    let res = {};
    this.markers.forEach(marker => {
      if (marker.content) {
        res[`m${marker.name}`] = marker.content;
      }
    });
    return res;
  }

  /**
   * Return a collection of all markers and their respective colours.
   *
   * @type {{bgcolor: string, color: string}} markersByColor
   * @return {{bgcolor: string, color: string}}
   */
  @computed get markersByColor () {
    let res = {};
    this.markers.forEach((marker) => {
      res[`m${marker.name}`] = {
        bgcolor: marker.bgcolor,
        color: marker.color
      };
    });
    return res;
  }

  /**
   * Performs validity checks on all markers.
   *
   * @return {Promise}
   */
  markersReady = () => {
    return this.freezeMarkers();
  }

  /**
   * Loads and initialises all markers belonging to a given session.
   *
   * @param {{username: string}} param
   * @return {Promise}
   */
  @action init ({username}) {
    this.username = username;
    return initMarkersAPI().then(data => {
      this.markers.clear();
      if (data) {
        Object.keys(data).forEach(key => {
          const marker = MarkerModel.fromJS({
            username: this.username,
            ...data[key]
          });
          this.markers.push(marker);
          // observe lastValidContent field
          marker.setDisposer(
            marker.lastValidContent.observe((newValue, oldValue) => {
              if (newValue !== oldValue) {
                this._setContentChanged();
              }
            }, true),
            marker.id
          );
        });
      }
    });
  }

  /**
   * Adds a new marker to the database.
   *
   * @return {Promise}
   */
  @action addMarker = () => {
    const nextMarker = this._getNextMarker();
    if (!nextMarker) {
      return Promise.reject('You have reached the maximum number of markers for one session!');
    }
    return addMarkerAPI({nextMarker})
      .catch(error => console.log('Adding a marker failed for some reason...', error))
      .then(data => {
        const markerId = Object.keys(data).sort().pop();
        const marker = MarkerModel.fromJS({
          username: this.username,
          ...data[markerId]
        });
        this.markers.push(marker);
        // observe lastValidContent field
        marker.setDisposer(
          marker.lastValidContent.observe((newValue, oldValue) => {
            if (newValue !== oldValue) {
              this._setContentChanged();
            }
          }, true),
          marker.id
        );
        return marker;
      });
  }

  /**
   * Remove a marker from the store.
   *
   * @param {MarkerModel} marker
   * @return {Promise}
   */
  @action deleteMarker = (marker) => {
    if (this.markers.length < 2) {
      return Promise.reject('You are not allowed to delete the last marker!');
    }
    return deleteMarkerAPI({markerId: marker.id})
      .then(data => {
        if (data && data.hasOwnProperty('success')) {
          marker.destroy();
          this.markers.remove(marker);
        }
      })
      .catch(error => {
        console.log('Removing marker failed!', error);
        throw new Error(error);
      });
  }

  /**
   * Freeze every marker's version and update in db.
   *
   * @private
   * @return {Promise}
   */
  _freeze () {
    return Promise.all(
      this.markers.map(marker => marker.freeze())
    )
    .catch(error => {
      return Promise.reject('Unable to freeze markers: ' + error);
    });
  }

  /**
   * Freeze history and update version for each dirty marker.
   * Also remove empty markers never used.
   *
   * @return {Promise}
   */
  @action freezeMarkers () {
    if (this.hasInvalidMarkers === true) {
      return Promise.reject('Some markers contain invalid content.');
    }
    const markersToKeep = this.markers.filter(marker => marker.isUsed || marker.dirty);
    // reject there is no marker with valid content
    if (!markersToKeep.length) {
      return Promise.reject('At least one non-empty marker is required to launch search.');
    }
    const markersToDelete = this.markers.filter(marker => !marker.isUsed && !marker.dirty);
    // if there are markers to delete
    if (markersToDelete.length) {
      // stop automatic renaming on markers change
      this.isBatchUpdate = true;
      // delete markers from collection
      markersToDelete.forEach((marker, i) => {
        marker.destroy();
        this.markers.remove(marker);
      });
      this.isBatchUpdate = false;
      // delete markers from database
      return Promise.all(
        markersToDelete.map(marker => {
          return deleteMarkerAPI({markerId: marker.id});
        })
      )
      .catch(error => Promise.reject('Problems removing markers! ' + error))
      // rename markers
      .then(() => {
        return this._renameMarkers({
          removed: [true],
          index: 0
        });
      })
      // freeze all markers
      .then(() => {
        // freeze markers then trigger content has changed
        return this._freeze().then(() => this._setContentChanged());
      });
    }
    return this._freeze();
  }

  /**
   * Fetch marker from collection by id.
   *
   * @param {number} markerId
   * @return {MarkerModel}
   */
  getMarkerById (markerId) {
    markerId = parseInt(markerId, 10);
    return this.markers.find(marker => marker.id === markerId);
  }

  /**
   * Updates observable property contentChanged with a new timestamp.
   * This should only be updated in on of the below cases:
   * - a marker's content changes and is valid
   * - a marker is removed
   *
   * @private
   */
  _setContentChanged () {
    this.contentChanged.set(Math.floor(Date.now()));
  }

  /**
   * Update colours when reordering and marker colours are still default colours.
   *
   * @private
   * @param {MarkerModel} marker
   * @param {string} newName - new name for passed marker
   */
  _updateColors (marker, newName) {
    if (markerColors[marker.name] === marker.bgcolor) {
      marker.bgcolor = markerColors[newName];
    }
  }

  /**
   * After a marker is deleted, reorder marker names.
   *
   * @private
   * @param {object} changes
   * @return {Promise}
   */
  _renameMarkers (changes) {
    // only act after a marker was removed and it wasn't the last marker
    if (changes.removed.length && changes.index < this.markers.length) {
      let payload = [];
      this.markers.forEach((marker, idx) => {
        if (idx >= changes.index) {
          const name = this.markerNames[idx];
          const title = /^Marker [A-Z]$/.test(marker.title) ? `Marker ${name}` : marker.title;
          // update colours to default colours if they haven't been customised yet
          this._updateColors(marker, name);
          // create payload for marker
          payload.push({
            marker: {
              id: marker.id,
              name: name,
              title: title,
              bgcolor: marker.bgcolor,
              color: marker.color
            }
          });
          // update name and title for current marker
          marker.name = name;
          marker.title = title;
        }
      });
      if (payload.length) {
        return updateMarkersAPI({payload})
          .catch(() => {
            Promise.reject('Failed renaming/reordering markers!');
          })
          .then(data => {
            // if db update fails, roll back to old content
            if (!data || !data.hasOwnProperty('success')) {
              return Promise.reject('Unable to rename/reorder markers!');
            }
            return Promise.resolve();
          });
      }
    }
    return Promise.resolve();
  }

  /**
   * Get next marker name, in the range of A-Z.
   *
   * @private
   * @return {string}
   */
  _getNextMarker () {
    const markersByNames = this.markers.map(marker => marker.name);
    const lastMarkerName = markersByNames.sort()[markersByNames.length - 1];
    return this.markerNames[this.markerNames.indexOf(lastMarkerName) + 1] || '';
  }

}

/**
 * Exports a singleton of {@link MarkersStore}
 */
export default new MarkersStore();
