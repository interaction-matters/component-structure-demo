import Immutable from 'immutable';

// Prototype extension for Immtuable.Record
// - create Records with fromJS
(() => {
  Immutable.Record.constructor.prototype.fromJS = function (values) {
    const nested = Immutable.fromJS(values, (key, value) => {
      if (this.prototype[key] && this.prototype[key].constructor.prototype instanceof Immutable.Record) {
        return this.prototype[key].constructor.fromJS(value);
      }
      return value;
    });
    return this(nested);
  };
})();
