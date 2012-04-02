function Staffer(availability, timeConflicts, needs) {
  this.aMatrix = new Staffing.Matrix(availability.length, availability[0].length, availability, 0);
  this.cMatrix = new Staffing.Matrix(timeConflicts.length, timeConflicts.length, timeConflicts, 0);
  this.sMatrix = new Staffing.Matrix(availability.length, availability[0].length);
  this.needs = needs;
  this.timeCount = timeConflicts.length;
  this.persCount = availability.length;
}

Staffer.prototype.staffSlot = function(it) {
  var slot = it.nextTimeslot();
  var pers = it.nextPerson();
  for(var j = 0; pers != -1 && j < this.needs[slot]; j++) {
    if(this.isStaffable(pers, slot)) {
      this.sMatrix.setValue(pers, slot, true);
      it.confirmUse(pers);
    }
    else {
      j--;
    }
    pers = it.nextPerson();
  }
}

Staffer.prototype.staff = function() {
  var it = new AvailabilityIterator(this.aMatrix);
  for(var i = 0; i < this.timeCount; i++) {
    this.staffSlot(it);
  }
}

Staffer.prototype.swapForMaxed = function(maxRatio, minStaffCount) {
  var that = this;
  var checked = UTIL.fillArray(null, this.persCount, function(index) {
    return false;
  });
  var ratios = UTIL.fillArray(null, this.persCount, function(index) {
      return that.sMatrix.countXVals(index) / that.aMatrix.countXVals(index);
  });
  var highestIndex = UTIL.greatestIndex(ratios, checked)
  
  while(highestIndex != -1 && ratios[highestIndex] > maxRatio 
        && this.sMatrix.countXVals(highestIndex) < minStaffCount) 
  {
    var ratio = ratios[highestIndex];
    checked[highestIndex] = true;
    var slots = sMatrix.getXVals(highestIndex);
    
    for(var i = 0; i < slots.length && ratio > maxRatio; i++) {
      var others = this.aMatrix.getYVals(slots[i]);
      var slot = slots[i];
      var found = false
      for(var j = 0; j < others.length; j++) {
        var other = others[j];
        if(!this.sMatrix.isSet(other, slot) && 
            this.isStaffable(other, slot) && 
            (this.sMatrix.countXVals(other) + 1) / this.aMatrix.countXVals(other) < maxRatio) 
            {
              sMatrix.setValue(other, slot, true);
              sMatrix.removeValue(highestIndex, slot);
              j = others.length;
              ratio = this.sMatrix.countXVals(other) / this.aMatrix.countXVals(other);
              ratios[other] = this.sMatrix.countXVals(other) / this.aMatrix.countXValus(other);
              ratios[highestIndex] = ratio;
            }
      }      
    }
    
    highestIndex = UTIL.greatestIndex(ratios, checked);
  }
}

Staffer.prototype.isStaffable = function(person, timeslot) {
  var staffedTimes = this.sMatrix.getXVals(person);
  var ret = true;
  var that = this;
  UTIL.forEach(staffedTimes, function(otherTime) {
    if(that.cMatrix.isSet(otherTime, timeslot) || that.cMatrix.isSet(timeslot, otherTime)) 
      ret = false;
  });
  return ret;
}