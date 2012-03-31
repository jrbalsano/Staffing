/**
 * Creates a new instance of Matrix
 * 
 * @param {Number} xcount The width of the array
 * @param {Number} ycount The height of the array
 * @classDescription The Matrix class represents a zero-indexed 2d matrix.
 */
function Matrix(xcount, ycount) {
  this.xs = UTIL.fillArray(null, xcount, function(index) {
    return new UTIL.Dictionary();
  });
  this.ys = UTIL.fillArray(null, ycount, function(index) {
    return new UTIL.Dictionary();
  });
};

/**
 * @property {Error} An exception meaning the element accessed was out of the
 * matrix bounds
 */
Matrix.prototype.OutOfBoundsException = new Error("Out of matrix bounds!");

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
Matrix.prototype.setValue = function(x, y, value) {
  if(x < xs.length && y < ys.length) {
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
Matrix.prototype.removeValue = function(x, y) {
  if(x < xs.length && y < ys.length) {
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
Matrix.prototype.isSet = function(x, y) {
  return this.xs[x].contains(y);
};

/**
 * Counts the values in an X row
 * @param {Number} x The x number of the row to check
 * @return {Number} The number of set values
 */
Matrix.prototype.countXVals = function(x) {
  return this.xs[x].count;
};

/**
 * Counts the values in an y column
 * @param {Number} y The y number of the column to check
 * @return {Number} The number of set values
 */
Matrix.prototype.countYVals = function(y) {
  return this.ys[y].count
}

Matrix.prototype.getXVals = function(x) {
  var ret = [];
  UTIL.forEachIn(this.xs[x].values, function(key, value) {
    ret.push(key);
  });
  return ret;
}