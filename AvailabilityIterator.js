function AvailabilityIterator(aMatrix) {
  this.aMatrix = aMatrix;
  this.curSlot = 0;
  this.curPers = 0;
  this.usedSlots = UTIL.fillArray(null, aMatrix.ys.length, function(index) {
    return false;
  });
  this.usedPeople = UTIL.fillArray(null, aMatrix.ys.length, function(index) {
    return false;
  });
  this.pCountBySlot = UTIL.fillArray(null, aMatrix.ys.length, function(index) {
    aMatrix.countYVals(index);
  });
  this.sCountByPerson = UTIL.fillArray(null, aMatrix.xs.length, function(index) {
    aMatrix.countXVals(index);
  });
}

AvailabilityIterator.prototype.nextTimeslot = function() {
  if(this.curslot != undefined) {
    var aPeople = this.aMatrix.getYVals();
    UTIL.forEach(aPeople, function(value) {
      this.sCountByPerson[value]--;
    });
  }
  this.curSlot = UTIL.leastIndex(this.pCountBySlot, this.usedSlots);
  usedSlots[this.curSlot] = true;
  this.usedPeople = UTIL.fillArray(null, aMatrix.ys.length, function(index) {
    return false;
  });
  return this.curSlot;
}

AvailabilityIterator.prototype.nextPerson = function() {
  do {
    var index = UTIL.leastIndex(this.sCountByPerson, usedPeople);
    usedPeople[index] = true;
  } while(!this.aMatrix.isSet(index, this.curSlot));
  this.curPers = index;
  return index;
}

AvailabilityIterator.prototype.confirmUse = function(person) {
  sCountByPerson[person]--;
}
