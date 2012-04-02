var UTIL = UTIL || {};
/**
 * Generates a new Dictionary object
 *
 * @classDescription Dictionaries store key value pairs in an easy to use
 * format such you can always get a list of keys without extra properties.
 * @param {Object} startValues An object which contains initial sets of
 * keys with their values. 
 */
UTIL.Dictionary = function Dictionary(startValues) {
  this.values = startValues || {};
  this.count = 0;
};

UTIL.Dictionary.prototype.store = function(name, value) {
  this.values[name] = value;
  this.count++;
};

UTIL.Dictionary.prototype.contains = function(name) {
  return Object.prototype.hasOwnProperty.call(this.values, name);
};

UTIL.Dictionary.prototype.remove = function(key) {
  if(this.contains(key)) delete this.values[key];
  this.count--;
};

UTIL.Dictionary.prototype.lookup = function(name) {
  return this.values[name];
};

UTIL.Dictionary.prototype.clear = function() {
  this.values = {};
  this.count = 0;
}
