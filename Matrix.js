function Matrix(xcount, ycount) {
  this.xs = UTIL.fillArray(null, xcount, function(index) {
    return new UTIL.Dictionary();
  });
  this.ys = UTIL.fillArray(null, ycount, function(index) {
    return new UTIL.Dictionary();
  });
};

Matrix.prototype.setValue = function(x, y, value) {
  this.xs[x].store(y, value);
  this.ys[y].store(x, value);
};

Matrix.prototype.removeValue = function(x, y) {
  this.xs[x].remove(y);
  this.ys[y].remove(x);
};

Matrix.prototype.isSet = function(x, y) {
  return this.xs[x].contains(y);
};

Matrix.prototype.countXVals = function(x) {
  return this.xs[x].count;
};

Matrix.prototype.countYVals = function(y) {
  return this.ys[y].count
}
