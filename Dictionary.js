var UTIL = (function(my) {
  my.Dictionary = function Dictionary(startValues) {
    this.values = startValues || {};
    this.count = 0;
  }
  my.Dictionary.prototype.store = function(name, value) {
    this.values[name] = value;
    count++;
  }
  my.Dictionary.prototype.lookup = function(name) {
    return this.values[name];
  }
  my.Dictionary.prototype.contains = function(name) {
    return Object.prototype.hasOwnProperty.call(this, name);
  }
  
  return my;
})(UTIL || {});
