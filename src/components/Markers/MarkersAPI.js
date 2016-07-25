import { http } from 'utils/http';
import { paths } from 'config';
import { markers as colors } from 'stylesConfig';
import { ES } from 'utils/presto';

import { processUrl } from 'utils/processUrl';

/**
 * Initialise markers.
 *
 * @export
 * @returns {Promise}
 */
export function initMarkersAPI () {
  const url = processUrl(paths.getMarkers);
  return http(url).get().then(data => {
    if (!data.length) {
      const nextMarker = 'A';
      return addMarkerAPI({nextMarker});
    }
    let result = {};
    data.forEach(data => {
      const historyLatest = data.marker['history-latest'];
      // if expanded field does not exist, create it
      if (!historyLatest.hasOwnProperty('expanded') || typeof historyLatest.expanded === 'undefined') {
        historyLatest.expanded = '';
      }
      // if flag field does not exist, create it
      if (!historyLatest.hasOwnProperty('flag') || typeof historyLatest.flag === 'undefined') {
        historyLatest.flag = '';
      }
      // result
      result[data.marker.id] = {
        id: data.marker.id,
        name: data.marker.name,
        title: data.marker.title,
        bgcolor: data.marker.bgcolor || colors[data.marker.name],
        color: data.marker.color || colors.text,
        'history-latest': historyLatest,
        is_dirty: !!historyLatest.expanded.length,
        is_used: historyLatest.version !== 0
      };
    });
    return result;
  });
}

/**
 * Add a new marker to the database.
 *
 * @export
 * @param {object} params
 * @param {string} params.nextMarker
 * @returns {Promise}
 */
export function addMarkerAPI (params) {
  const {
    nextMarker
  } = params;
  const url = processUrl(paths.getMarkers);

  return http(url).put({
    body: JSON.stringify([{
      marker: {
        name: nextMarker,
        title: `Marker ${nextMarker}`,
        bgcolor: colors[nextMarker],
        color: colors['text'],
        history: [{version: '0', content: '', expanded: '', flag: '', metadata: ''}]
      }
    }])
  })
  .then(() => initMarkersAPI());
}

/**
 * Remove a marker from the database.
 *
 * @export
 * @param {object} params
 * @param {number} params.markerId
 * @returns {Promise}
 */
export function deleteMarkerAPI (params) {
  const {
    markerId
  } = params;
  const url = processUrl(paths.getMarkerById).replace('%markerId', markerId);

  return http(url).delete();
}

/**
 * Update marker by marker name.
 *
 * @export
 * @param {object} params
 * @param {string} params.markerName
 * @param {object} params.payload
 * @returns {Promise}
 */
export function updateMarkerByNameAPI (params) {
  const {
    markerName,
    payload
  } = params;
  const url = processUrl(paths.getMarkerByName).replace('%markerName', markerName);

  return http(url).put({
    body: JSON.stringify(payload)
  });
}

/**
 * Update marker by markerId, present in payload param.
 *
 * @export
 * @param {object} params
 * @param {object} params.payload
 * @returns {Promise}
 */
export function updateMarkersAPI (params) {
  const {
    payload
  } = params;
  const url = processUrl(paths.getMarkers);

  return http(url).put({
    body: JSON.stringify(payload)
  });
}

/**
 * Validate PQL in content.
 *
 * @export
 * @param {object} params
 * @param {string} params.content
 * @param {string} params.username
 * @returns {Promise}
 */
export function validatePqlAPI (params) {
  const {
    content,
    username
  } = params;

  // wrap return value in promise
  return new Promise((resolve, reject) => {
    if (content.trim() === '') {
      resolve({
        status: true
      });
    }
    // instantiate new ES object
    const es = new ES(paths.esis, Function.prototype);
    // handler for processing pqlToJson response
    const handler = (data, status) => {
      let valid = {};
      if (status !== 200) {
        // error
        valid.status = false;
        valid.message = (typeof data === 'string' && status === 400) ? JSON.parse(data).message : 'Unknown error';
      } else {
        // success
        valid.status = true;
        valid.response = data.response;
      }
      resolve(valid);
    };
    // es call
    es.pqlToJson(content, handler, username);
  });
}
