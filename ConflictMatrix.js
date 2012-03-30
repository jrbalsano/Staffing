function ConflictMatrix(timeslots) {
  this.conflictLists = UTIL.fillArray(null, timeslots, function(){
    return new UTIL.Dictionary();
  });
}
ConflictMatrix.prototype.setConflict = function(time1, time2) {
  this.conflictLists[time1].store(time2, true);
  this.conflictLists[time2].store(time1, true);
};

ConflictMatrix.prototype.isConflict = function(time1, time2) {
  return this.conflictLists[time1].contains(time2);
};

ConflictMatrix.prototype.getConflicts = function(time) {
  var ret = [];
  UTIL.forEachIn(this.conflictLists[time], function(name, value) {
    ret.push(name);
  });
  return ret;
};