var UTIL = (function(my) {
  my.Dictionary = function Dictionary(startValues) {
    this.values = startValues || {};
  }
  my.Dictionary.prototype.store = function(name, value) {
    this.values[name] = value;
  }
  my.Dictionary.prototype.lookup = function(name) {
    return this.values[name];
  }
  my.Dictionary.prototype.contains = function(name) {
    return Object.prototype.hasOwnProperty.call(this, name);
  }
  
  return my;
})(UTIL || {});
