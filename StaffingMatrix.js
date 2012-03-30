function StaffingMatrix(p, t) {
  this.people = UTIL.fillArray(null, p, function(index) {
    return new UTIL.Dictionary();
  });
  this.timeslots = UTIL.fillArray(null, t, function(index) {
    return new UTIL.Dictionary();
  });
};

StaffingMatrix.prototype.usePerson = function(person, timeslot) {
  this.people[person].store(timeslot, true);
  this.timeslots[timeslot].store(person, true);
};

StaffingMatrix.prototype.relievePerson = function(person, timeslot) {
  this.people[person].remove(timeslot);
  this.timeslots[timeslot].remove(person);
};

StaffingMatrix.prototype.isStaffed = function(person, timeslot) {
  return this.people[person].contains(timeslot);
};