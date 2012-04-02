var Staffing = Staffing || {};

/**
 * Creates a new instance of Matrix
 * 
 * @param {Number} xcount The width of the array
 * @param {Number} ycount The height of the array
 * @param {Array} [initialValues] An Array of length xcount containing Arrays of
 * length ycount which contains values upon which the array should be
 * initialized. If this parameter is provided, emptyVal must also be provided.
 * @param [emptyVal] A value to compare each value to using ==. If the
 * comparison returns true, this value will not be stored in the matrix.
 * @classDescription The Matrix class represents a zero-indexed 2d matrix.
 */
Staffing.Matrix = function Matrix(xcount, ycount, initialValues, emptyVal) {
  var args = arguments;
  this.xs = UTIL.fillArray(null, xcount, function(index) {
    var ret = new UTIL.Dictionary();
    if(args.length > 2) {
      for(var y = 0; y < ycount; y++) {
        if(initialValues[index][y] != emptyVal)
          ret.store(y, initialValues[index][y]);
      }
    }
    return ret;
  });
  this.ys = UTIL.fillArray(null, ycount, function(index) {
    var ret = new UTIL.Dictionary();
    if(args.length > 2) {
      for(var x = 0; x < xcount; x++) {
        if(initialValues[x][index] != emptyVal)
          ret.store(x, initialValues[x][index]);
      }
    }
    return ret;
  });
};

/**
 * @property {Error} An exception meaning the element accessed was out of the
 * matrix bounds
 */
Staffing.Matrix.prototype.OutOfBoundsException = new Error("Out of matrix bounds!");

/**
 * Sets a value in the matrix
 * 
 * @param {Number} x The x coordinate of the parameter to set
 * @param {Number} y The y coordinate of the parameter to set
 * @param {Object, String, Number, Boolean} The value to set at the specified
 * location
 * @exception {Matrix.prototype.OutofBoundsException} An exception meaning the 
 * element accessed was outside of the bounds of the matrix.
 */
Staffing.Matrix.prototype.setValue = function(x, y, value) {
  if(x < this.xs.length && y < this.ys.length) {
    this.xs[x].store(y, value);
    this.ys[y].store(x, value); 
  }
  else
    throw Matrix.prototype.OutOfBoundsException;
};

/**
 * Removes/unsets a value in the matrix
 * 
 * @param {Number} x The x coordinate of the parameter to remove
 * @param {Number} y The y coordinate of the parameter to remove
 * @exception {Matrix.prototype.OutofBoundsException} An exception meaning the 
 * element accessed was outside of the bounds of the matrix.
 */
Staffing.Matrix.prototype.removeValue = function(x, y) {
  if(x < this.xs.length && y < this.ys.length) {
    this.xs[x].remove(y);
    this.ys[y].remove(x);
  }
  else
    throw Matrix.prototype.OutOfBoundsException
};

/**
 * Checks to see if a property is set in this matrix
 * 
 * @param {Number} x The x coordinate of the parameter to check
 * @param {Number} y The y coordinate of the parameter to check
 * @return {Boolean} True if set, false otherwise
 */
Staffing.Matrix.prototype.isSet = function(x, y) {
  return this.xs[x].contains(y);
};

/**
 * Counts the values in an X row
 * @param {Number} x The x number of the row to check
 * @return {Number} The number of set values
 */
Staffing.Matrix.prototype.countXVals = function(x) {
  return this.xs[x].count;
};

/**
 * Counts the values in an y column
 * @param {Number} y The y number of the column to check
 * @return {Number} The number of set values
 */
Staffing.Matrix.prototype.countYVals = function(y) {
  return this.ys[y].count
}

Staffing.Matrix.prototype.getXVals = function(x) {
  var ret = [];
  UTIL.forEachIn(this.xs[x].values, function(key, value) {
    ret.push(key);
  });
  return ret;
}

Staffing.Matrix.prototype.getYVals = function(y) {
  var ret = [];
  UTIL.forEachIn(this.ys[y].values, function(key, value) {
    ret.push(key);
  });
  return ret;
}

Staffing.Matrix.prototype.get2DArray = function() {
  var that = this;
  var ret = UTIL.fillArray(null, that.xs.length, function(xIndex) {
    return UTIL.fillArray(null, that.ys.length, function(yIndex) {
      return that.xs[xIndex].lookup(yIndex);
    });
  });
  return ret;
}
