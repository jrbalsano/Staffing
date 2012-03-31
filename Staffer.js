function Staffer(availability, timeConflicts, needs) {
  this.aMatrix = new Staffing.Matrix(availability.length, availability[0].length, availability, "");
  this.cMatrix = new Staffing.Matrix(timeConflicts.length, timeConflicts.length, timeConflicts, "");
  this.sMatrix = new Staffing.Matrix(availability.length, availability[0].length);
  this.needs = needs;
  this.timeCount = timeConflicts.length;
  this.persCount = availability.length;
}

Staffer.prototype.staff = function() {
  var it = new AvailabilityIterator(this.aMatrix);
  var that = this;
  
  function staffSlot(value) { //Staffs a slot
    with(that) { //The following uses the namespace of this Staffer object
      var slot = it.nextTimeslot();
      var pers = it.nextPerson();
      for(var j = 0; pers != -1 && j < needs[slot]; j++) {
        if(isStaffable(pers, slot)) {
          sMatrix.setValue(pers, slot, true);
          it.confirmUse(pers);
        }
        else {
          j--;
        }
        pers = it.nextPerson()
      }
    }
  }
  
  UTIL.forEach(needs, staffSlot(value));
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
  
  while(highestIndex != -1 && ratios[highestIndex] > maxFraction 
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
  var staffedTimes = sMatrix.getXVals(person);
  var ret = true;
  UTIL.forEach(staffedTimes, function(value) {
    if(cMatrix.xs[timeslot].contains(value)) 
      ret = false;
  });
  return ret;
}