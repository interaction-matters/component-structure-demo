/**
 * Round Numbers to a number of decimal places.
 * NB: The number of decimals in the given number has precedence over decimalPlaces
 *
 * @param  {Mixed}    number          Either a number or a string
 * @param  {Integer}  decimalPlaces   Number of decimal places (no decimals by default)
 *
 * @return {Number}                   Rounded number
 */
export function roundNumber (number, decimalPlaces = 0) {
  const f = parseInt('1' + '0'.repeat(decimalPlaces), 10);
  return Math.round(number * f) / f;
}

/**
 * Either returns an array of datasource item(s), or if name parameter is passed, returned array only contains the corresponding item.
 * - Possible values for name:
 *   - familyid
 *   - rid
 *   - publicationid
 *   - publicationidshort
 *   - publicationdate
 *   - fulltextid
 *   - claimsid
 *   - descriptionid
 *   - language
 *   - bucket  -> Should always be the last item in datasource and is only available in searchresults module
 * @param {String}        datasource Datasource, eg. 046330216/277417491/US2008281426A1/2008-11-13/089def3d-b5a6-4092-b0e8-8850abaa3a83,0452208e-1ba2-4ec3-b3a9-cab513028156/EN
 * @param {String}        name One of the possible values for name
 * @return {Mixed}        Array containing datasource items, or a specific item from the datasource
 */
export function datasource (datasource, name) {
  if (!datasource || typeof datasource !== 'string') {
    return null;
  }
  let ds = datasource.split('/');
  let ft = ds[4] ? ds[4].split(',') : [];
  let retval = {
    'datasource': datasource,
    'familyid': ds[0],
    'rid': ds[1],
    'publicationidshort': ds[2] || '',
    'publicationdate': ds[3] || '',
    'publicationid': ds[2] + ds[3].replace(/\-/g, '') || '',
    'fulltextid': ds[4] || ',',
    'claimsid': ft[0] || '',
    'descriptionid': ft[1] || '',
    'language': ds[5] || 'EN',
    'bucket': ds[6] ? ds[6] : '' // Should always be the last item in datasource
  };

  if (name && typeof name === 'string') {
    name = name.toLowerCase();
    if (retval.hasOwnProperty(name)) {
      return retval[name];
    }
  }

  return retval;
}

/**
 * Helper to turn object into {@link datasource} object.
 *
 * @param  {object}  obj          Object containing properties present in datasource object
 * @return {object} {@link datasource}
 */
export function datasourceFromObject (obj) {
  return datasource([
    obj.family_id,
    obj.rid,
    obj.pn_docdb.slice(0, -8),
    obj.pn_docdb.slice(-8),
    obj.fulltext_id,
    ''
  ].join('/'));
}

/**
 * Helper to check if a document (publication) is in time/p-or-e/late wrt the application
 *
 * All dates are expected to be in YYYY-MM-DD format
 *
 * @param  {String}  publicationDate          The document's publication date
 * @param  {String}  priorityDate             The document's priority date
 * @param  {String}  applicationPriorityDate  The application's priority date
 * @param  {String}  applicationFilingDate    The application's filing date
 *
 * @return {String}                           A string of "unknown", "in-time", "p-or-e", or "late"
 *                                            reflecting the result of the timeliness analysis
 */
export function checkTimeliness (publicationDate, priorityDate, applicationPriorityDate, applicationFilingDate) {
  publicationDate = String(publicationDate).replace(/-/g, '');
  priorityDate = String(priorityDate).replace(/-/g, '');
  applicationPriorityDate = String(applicationPriorityDate).replace(/-/g, '');
  applicationFilingDate = String(applicationFilingDate).replace(/-/g, '');

  publicationDate = publicationDate || priorityDate;
  priorityDate = priorityDate || publicationDate;

  if (!publicationDate && !priorityDate) {
    return 'unknown';
  } else if (publicationDate < applicationPriorityDate) {
    return 'in-time';
  } else if (publicationDate >= applicationPriorityDate && publicationDate <= applicationFilingDate) { // P
    return 'p-or-e';
  } else if (priorityDate <= applicationFilingDate && publicationDate >= applicationFilingDate) { // E
    return 'p-or-e';
  } else {
    return 'late';
  }
}

/**
 * Helper to get the first non-empty entry in an array of text, with an option to trim (strip leading and trailing) whitespaces
 * of the text
 *
 * @param  {Array}    data  A list of texts
 * @param  {Boolean}  trim  A flag to indicate whether or not we should trim whitespaces of the text
 *
 * @return {String}         The first entry in the data array that is not empty
 */
export function getFirstNonEmpty (data, trim) {
  var result;
  for (var i = 0, n = data.length; i < n; ++i) {
    result = data[i];
    if (Array.isArray(result)) { // sometimes ES, which is the source of data, put the text in an array of a string
      result = result[0] || '';
    }
    result = result ? result.toString() : '';
    if (trim) {
      result = result.trim();
    }
    if (result.length > 0) {
      break;
    }
  }
  if (result.length === 0) {
    result = undefined;
  }
  return result;
}

/**
 * Debounce events.
 *
 * @export
 * @param {function} func - Callback
 * @param {number} wait - Time to wait in milliseconds
 * @param {boolen} immediate - Run immediately
 * @return {function}
 */
export function debounce (func, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

/**
 * Generate a unique ID (UUID).
 *
 * @export
 * @returns {string}
 */
export function	uuid () {
  let random;
  let uuid = '';
  for (let i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid = uuid + '-';
    }
    uuid = uuid + (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}
