function Utils() {
  function forEach(arr, f) {
    for(var i = 0; i < arr.length; i++)
      f(arr[i]);
  }
  
  function reduce(combine, base, array) {
    forEach(array, function(element) {
      base = combine(base, element);
    });
    return base;
  }
  
  function count(test, array) {
    reduce(function(base, element) {
      return base + (test(element) ? 1 : 0);
    }, 0, array);
  }
  
  
}
