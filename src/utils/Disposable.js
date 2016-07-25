/**
 * Helper class which manages Mobx disposer functions.
 *
 * @export
 * @class Disposable
 */
export default class Disposable {
  disposers;

  /**
   * Creates an instance of Disposable.
  */
  constructor () {
    /**
     * @type {Map} disposers - Collection of disposer callbacks
     */
    this.disposers = new Map();
  }

  /**
   * Add a new disposer.
   *
   * @param {function} val
   * @param {any} [key=timestamp]
   */
  setDisposer (val, key = Math.floor(Date.now())) {
    this.disposers.set(key, val);
  }

  /**
   * Call a disposer by key.
   *
   * @param key {any}
   */
  dispose (key) {
    const disposer = this.disposer.get(key);
    if (typeof disposer === 'function') {
      disposer();
      this.disposers.delete(key);
    }
  }

  /**
   * Calls all disposer functions tied to this object, so they may be GC-ed.
   */
  destroy () {
    this.disposers.forEach((disposer, key) => {
      if (typeof disposer === 'function') {
        disposer();
      }
    });
    this.disposers.clear();
    this.disposers = null;
  }
}
