function AvailabilityIterator(aMatrix) {
  this.aMatrix = aMatrix;
  this.curSlot = undefined;
  this.curPers = 0;
  this.usedSlots = UTIL.fillArray(null, aMatrix.ys.length, function(index) {
    return false;
  });
  this.usedPeople = UTIL.fillArray(null, aMatrix.ys.length, function(index) {
    return false;
  });
  this.pCountBySlot = UTIL.fillArray(null, aMatrix.ys.length, function(index) {
    return aMatrix.countYVals(index);
  });
  this.sCountByPerson = UTIL.fillArray(null, aMatrix.xs.length, function(index) {
    return aMatrix.countXVals(index);
  });
  this.staffedCountByPerson = UTIL.fillArray(null, aMatrix.xs.length, function(index) {
    return 0;
  });
}

AvailabilityIterator.prototype.nextTimeslot = function() {
  var that = this;
  if(this.curSlot != undefined) {
    var aPeople = this.aMatrix.getYVals(this.curSlot);
    UTIL.forEach(aPeople, function(value) {
      that.sCountByPerson[value]--;
    });
  }
  this.curSlot = UTIL.leastIndex(this.pCountBySlot, this.usedSlots);
  this.usedSlots[this.curSlot] = true;
  this.usedPeople = UTIL.fillArray(null, this.aMatrix.xs.length, function(index) {
    return !that.aMatrix.isSet(index, that.curSlot) || that.sCountByPerson[index] == 0;
  });
  return this.curSlot;
}

AvailabilityIterator.prototype.nextPerson = function() {
  var that = this;
  
  var leastStaffedValue = UTIL.leastValue(this.staffedCountByPerson, this.usedPeople);
  var leastStaffedPeople = [];
  UTIL.forEach(this.staffedCountByPerson, function(value, index) {
    if(!that.usedPeople[index] && value === leastStaffedValue) 
      leastStaffedPeople.push(index);
  });
  if(leastStaffedPeople.length == 0) { 
    var index = -1;
  }
  else {
    var least = this.sCountByPerson[leastStaffedPeople[0]] + 1;
    var index = -1;
    UTIL.forEach(leastStaffedPeople, function(value, i) {
      if(least > that.sCountByPerson[value]) {
        index = value;
        least = that.sCountByPerson[value];
      }
    });
    this.usedPeople[index] = true;
  }
  this.curPers = index;
  return index;
}

AvailabilityIterator.prototype.confirmUse = function(person) {
  this.staffedCountByPerson[person]++;
}
