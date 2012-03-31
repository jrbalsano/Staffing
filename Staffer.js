function Staffer(availability, timeConflicts) {
  this.aMatrix = new Staffing.Matrix(availability.length, availability[0].length, availability, "");
  this.cMatrix = new Staffing.Matrix(timeConflicts.length, timeConflicts.length, timeConflicts, "");
  this.sMatrix = new Staffing.Matrix(availability.length, availability[0].length);
}

Staffer.prototype.isStaffable = function(person, timeslot) {
  var staffedTimes = sMatrix.getXVals(person);
  var ret = true;
  UTIL.forEach(staffedTimes, function(value) {
    if(cMatrix.xs[timeslot].contains(value)) 
      ret = false;
  });
  return ret;
}
