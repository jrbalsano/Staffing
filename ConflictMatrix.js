function ConflictMatrix(timeslots) {
  var conflictLists = UTIL.fillArray(null, timeslots, function(){
    return new UTIL.Dictionary();
  });
  
  this.setConflict = function(time1, time2) {
    conflictLists[time1].store(time2, true);
    conflictLists[time2].store(time1, true);
  };
  
  this.getConflict = function(time1, time2) {
    return conflictLists[time1].contains(time2);
  };
  
  this.getConflicts = function(time) {
    var ret = [];
    UTIL.forEachIn(conflictLists[time], function(name, value) {
      ret.push(name);
    });
    return ret;
  };
}