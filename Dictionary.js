var UTIL = UTIL || {};
UTIL.Dictionary = function Dictionary(startValues) {
  this.values = startValues || {};
  this.count = 0;
};

UTIL.Dictionary.prototype.store = function(name, value) {
  this.values[name] = value;
  count++;
};


UTIL.Dictionary.prototype.contains = function(name) {
  return Object.prototype.hasOwnProperty.call(this, name);
};

UTIL.Dictionary.prototype.remove = function(key) {
  if(this.contains(key)) delete this.values[key];
  count--;
}

UTIL.Dictionary.prototype.lookup = function(name) {
  return this.values[name];
};
