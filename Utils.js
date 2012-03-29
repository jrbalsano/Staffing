/**
 * A library of utility functions necessary for proper operations
 */
var UTIL = UTIL || {};
  /**
   * Runs a function f on each element of an array
   * @param arr {Array} An array of items to cycle through
   * @param f {Function} A function of the form function(value) which takes as
   * parameter a value from the array.
   */
  UTIL.forEach = function forEach(arr, f) {
    for(var i = 0; i < arr.length; i++)
      f(arr[i]);
  }
  
  /**
   * Runs a function f on each property of an object
   * @param obj {Object} The object through which this cycles
   * @param f {Function} A function of the form function(propery, value) that
   * defines an action to be taken for each property.
   */
  UTIL.forEachIn = function forEachIn(obj, f) {
    for(var property in obj) {
      f(property, obj[property]);
    }
  }
  
  /**
   * Reduces an array to a single value by use of a function, combine.
   * @param combine {Function} A function of the form function(base, element)
   * which uses the previous value of combine (base) and a new value from the
   * array to return a new value of combine.
   * @param base {Object} The initial value from which combine should work
   * @param array {Array} The array which should be combined
   * @return {Object} the value of base after combine has been run on each
   * element in the array.
   */
  UTIL.reduce = function reduce(combine, base, array) {
    forEach(array, function(element) {
      base = combine(base, element);
    });
    return base;
  }
  
  /**
   * Counts the number of elements for which a certain condition is true in an
   * array.
   * @param test {Function} a function  of the form function(element) which
   * returns true if the element meets the desired condition and false
   * otherwise
   * @param array {Array} The array in which to count elements that meet the
   * condition
   */
  UTIL.count = function count(test, array) {
    reduce(function(base, element) {
      return base + (test(element) ? 1 : 0);
    }, 0, array);
  }
  
  /**
   * Fills an array to new values defined by a function. Can accept either an
   * existing array, in which case it is both modified and returned, or else a
   * new array which is only returned. 
   * @param arr {Array} the array in which to define values, if null, a new
   * array will be created.
   * @param length {Number} The number of items to fill in the array
   * @param f {Function} A function of the form function(index) which returns
   * the desired value for each index of an array.
   */
  UTIL.fillArray = function fillArray(arr, length, f) {
    var arr = arr || new Array();
    for(var i = 0; i < length; i++) {
      arr[i] = f(i);
    }
    return arr;
  }
