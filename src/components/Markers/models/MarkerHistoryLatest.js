import {observable} from 'mobx';

/**
 * Model for latest history property from MarkerModel.
 *
 * @class MarkerHistoryLatest
 */
export default class MarkerHistoryLatest {
  /**
   * id property {Number}
   */
  id;
  /**
   * content property {String}
   */
  @observable content;
  /**
   * expanded property {String}
   */
  @observable expanded;
  /**
   * flag property {String}
   */
  @observable flag;
  /**
   * lastModified property {String}
   */
  lastModified;
  /**
   * metadata property {String}
   */
  metadata;
  /**
   * version property {Number}
   */
  @observable version;

  /**
   * Creates an instance of MarkerHistoryLatest.
   *
   * @param id {Number}
   * @param content {String}
   * @param expanded {String}
   * @param flag {String}
   * @param last_modified {String}
   * @param metadata {String}
   * @param version {Number}
   */
  constructor ({id, content = '', expanded = '', flag = '', last_modified: lastModified, metadata, version}) {
    this.id = id;
    this.content = content;
    this.expanded = expanded;
    this.flag = flag;
    this.lastModified = lastModified;
    this.metadata = metadata;
    this.version = version;
    /**
     * To overcome legacy issues where flag field was incorrectly used for expanded field:
     *   - if expanded is empty but flag is not, exchange values
     */
    if (this.flag !== '' && this.expanded === '') {
      this.expanded = this.flag;
    }
    this.flag = '';
  }

  /**
   * Returns a JS object literal.
   *
   * @return {Object}
   */
  toJS () {
    return {
      id: this.id,
      content: this.content,
      expanded: this.expanded,
      flag: this.flag,
      last_modified: this.lastModified,
      metadata: this.metadata,
      version: this.version
    };
  }

  /**
   * Creates a new MarkerHistoryLatest instance from passed object.
   *
   * @static
   * @param o {Object}
   * @return {MarkerHistoryLatest}
   */
  static fromJS (o) {
    return new MarkerHistoryLatest({
      id: o.id,
      content: o.content,
      expanded: o.expanded,
      flag: o.flag,
      last_modified: o.hasOwnProperty('last_modified') ? o.last_modified : o.lastModified,
      metadata: o.metadata,
      version: o.version
    });
  }
}
