var UTIL = (function Utils() {
  var my = {};
  
  /**
   * Runs a function f on each element of an array
   * @param arr {Array} An array of items to cycle through
   * @param f {Function} A function of the form function(value) which takes as
   * parameter a value from the array.
   */
  my.forEach = function forEach(arr, f) {
    for(var i = 0; i < arr.length; i++)
      f(arr[i]);
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
  my.reduce = function reduce(combine, base, array) {
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
  my.count = function count(test, array) {
    reduce(function(base, element) {
      return base + (test(element) ? 1 : 0);
    }, 0, array);
  }
  
  return my;
})();
