import { observable, autorun, computed, action } from 'mobx';
import MarkerHistoryLatest from './MarkerHistoryLatest';

import {
  updateMarkerByNameAPI,
  updateMarkersAPI,
  validatePqlAPI
} from '../MarkersAPI';

import Disposable from 'utils/Disposable';

/**
 * Model for a marker.
 *
 * @export
 * @extends {Disposable}
 * @class MarkerModel
 */
export default class MarkerModel extends Disposable {
  /**
   * Id of marker.
   */
  id = 0;
  /**
   * @type {String} bgcolor
   */
  @observable bgcolor = '';
  /**
   * @type {string} color
   */
  @observable color = '';
  /**
   * @type {MarkerHistoryLatest} historyLatest
   */
  historyLatest = {};
  isDirty = false;
  /**
   * @type {boolean} isUsed - Marker was used for search
   */
  @observable isUsed = false;
  /**
   * @type {boolean} isDisabled
   */
  isDisabled = false;
  /**
   * @type {string} name
   */
  @observable name = '';
  /**
   * @type {string} title
   */
  @observable title = '';

  ///////////////////////
  // custom properties //
  ///////////////////////
  /**
   * @type {boolean} isValid
   */
  @observable isValid = true;
  /**
   * @type {string} validatedContent - Prevents content validation if already validated
   */
  validatedContent = '';

  /**
   * @type {Observable} lastValidContent - Only changed when content was actuallly changed and valid
   */
  lastValidContent = observable(undefined);

  /**
   * @type {string} username
   */
  username = '';

  /**
   * Creates an instance of MarkerModel.
   *
   * @param {{
   *   id: number,
   *   bgcolor: string,
   *   color: string,
   *   historyLatest: MarkerHistoryLatest,
   *   is_dirty: boolean,
   *   is_used: boolean,
   *   name: string,
   *   title: string,
   *   username = '': string
   * }} param - An object param
   */
  constructor ({id, bgcolor, color, 'history-latest': historyLatest, is_dirty: isDirty, is_used: isUsed, name, title, username = ''}) {
    super();
    this.id = id;
    this.bgcolor = bgcolor;
    this.color = color;
    this.historyLatest = MarkerHistoryLatest.fromJS(historyLatest);
    /**
     * Content from this version was changed.
     * @type {boolean} isDirty
     */
    this.isDirty = isDirty;
    this.isUsed = isUsed;
    // this.isDisabled = isDisabled;
    this.name = name;
    this.title = title;
    this.username = username;

    // Automatically trigger validateContent when content changes
    this.setDisposer(
      autorun(() => {
        // automatically validate content
        this.validateContent(this.content);
      }),
      'autorunOnContent'
    );
  }

  /**
   * Fetch latest history content.
   *
   * @readonly
   */
  @computed get content () {
    return this.historyLatest.expanded !== ''
      ? this.historyLatest.expanded
      : this.historyLatest.content;
  }

  /**
   * Return whether content differs from original content.
   *
   * @readonly
   */
  @computed get dirty () {
    this.isDirty = (this.historyLatest.expanded !== '' && this.historyLatest.expanded !== this.historyLatest.content);
    return this.isDirty;
  }

  /**
   * Update title.
   *
   * @param title {string}
   * @return {Promise}
   */
  @action editTitle = (title) => {
    title = title ? title.toString() : '';
    const oldTitle = this.title;
    const payload = {marker: {title}};
    // first change local title
    this.title = title;
    return updateMarkerByNameAPI({payload, markerName: this.name})
      .then(data => {
        // if db update fails, roll back to old title
        if (!data || !data.hasOwnProperty('success')) {
          this.title = oldTitle;
        }
        return;
      })
      .catch(() => {
        console.log('Editing marker title failed!');
        this.title = oldTitle;
      });
  }

  /**
   * Update content.
   *
   * @param content {string}
   * @return {Promise}
   */
  @action editContent = (content) => {
    content = content ? content.toString() : '';
    const history = this.historyLatest;
    const oldHistory = Object.assign({}, history.toJS());
    const payload = [{
      marker: {
        bgcolor: this.bgcolor,
        color: this.color,
        name: this.name,
        title: this.title,
        history: [{
          version: history.version,
          content: history.content,
          metadata: history.metadata,
          flag: history.flag,
          expanded: content
        }]
      }
    }];
    // first change local content
    this.historyLatest.expanded = content;
    return updateMarkersAPI({payload})
      .then(data => {
        // if db update fails, roll back to old content
        if (!data || !data.hasOwnProperty('success')) {
          this.historyLatest = MarkerHistoryLatest.fromJS(oldHistory);
        }
        // store valid content in separate variable
        if (this.isValid && content !== this.lastValidContent.get()) {
          this.lastValidContent.set(content);
        }
        return;
      })
      .catch(() => {
        console.log('Editing marker content failed!');
        this.historyLatest = MarkerHistoryLatest.fromJS(oldHistory);
      });
  }

  /**
   * Check content for valid pql.
   *
   * @param content {String}
   * @return {Promise}
   */
  @action validateContent = (content) => {
    content = content ? content.toString() : '';
    // if no content or content was already validated don't call server for content validation again
    if (!content || content === this.validatedContent) {
      if (!content) {
        this.isValid = true;
        this.validatedContent = '';
      }
      return Promise.resolve();
    }
    // content requires server validation
    return validatePqlAPI({content, username: this.username}).then(data => {
      this.isValid = (data && data.hasOwnProperty('status') && data.status === true);
      this.validatedContent = content;
    });
  }

  /**
   * Freeze history content, update version and set isDirty to false.
   *
   * @return {Promise}
   */
  @action freeze () {
    if (!this.dirty) {
      return Promise.resolve();
    }
    const history = this.historyLatest;
    const oldHistory = Object.assign({}, history.toJS());
    history.content = history.expanded;
    history.expanded = '';
    history.version = history.version + 1;
    const payload = [{
      marker: {
        id: this.id,
        is_dirty: false,
        is_used: true,
        history: [{
          version: history.version,
          content: history.content,
          expanded: history.expanded
        }]
      }
    }];
    return updateMarkersAPI({payload})
      .then(data => {
        // if db update fails, roll back to old content
        if (!data || !data.hasOwnProperty('success')) {
          this.historyLatest = MarkerHistoryLatest.fromJS(oldHistory);
        } else {
          this.isDirty = false;
          this.isUsed = true;
        }
      })
      .catch(() => {
        console.log('Freezing markers failed!');
        this.historyLatest = MarkerHistoryLatest.fromJS(oldHistory);
      });
  }

  /**
   * Returns a JS object literal.
   *
   * @return {{
   *   id: number,
   *   bgcolor: string,
   *   color: string,
   *   historyLatest: object,
   *   is_dirty: boolean,
   *   is_used: boolean,
   *   name: string,
   *   title: string,
   *   username: string
   * }} Object literal of instance
   */
  toJS () {
    return {
      id: this.id,
      bgcolor: this.bgcolor,
      color: this.color,
      'history-latest': this.historyLatest,
      is_dirty: this.isDirty,
      is_used: this.isUsed,
      name: this.name,
      title: this.title,
      username: this.username
    };
  }

  /**
   * Creates a new MarkerModel instance from passed object.
   *
   * @static
   * @param {{
   *   id: number,
   *   bgcolor: string,
   *   color: string,
   *   historyLatest: object,
   *   is_dirty: boolean,
   *   is_used: boolean,
   *   name: string,
   *   title: string,
   *   username: string
   * }} o - An object param
   * @return {MarkerModel}
   */
  static fromJS (o) {
    return new MarkerModel({
      id: o.id,
      bgcolor: o.bgcolor,
      color: o.color,
      'history-latest': o.hasOwnProperty('history-latest') ? o['history-latest'] : o.historyLatest,
      is_dirty: o.hasOwnProperty('is_dirty') ? o.is_dirty : o.isDirty,
      is_used: o.hasOwnProperty('is_used') ? o.is_used : o.isUsed,
      name: o.name,
      title: o.title,
      username: o.username
    });
  }
}
