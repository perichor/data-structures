

var HashTable = function(storageLimit) {
  if (storageLimit === undefined) {
    this._limit = 8;
  }
  this._storage = LimitedArray(this._limit);
  this._hasCollision = false;
};

HashTable.prototype.insert = function(key, value) {
  var index = getIndexBelowMaxForKey(key, this._limit);
  if (this._storage[index] === undefined) {
    this._storage[index] = {};
    this._storage[index][key] = value;
  } else {
    if (this._storage.hasOwnProperty(key)) {
      this._hasCollision = true;
      this._reHashLarger();
    }
    this._storage[index][key] = value;
  }
};

HashTable.prototype.retrieve = function(key) {
  var index = getIndexBelowMaxForKey(key, this._limit);
  if (this._storage[index] === undefined) {
    return undefined;
  } else {
    return this._storage[index][key];
  }
};

HashTable.prototype.remove = function(key) {
  var index = getIndexBelowMaxForKey(key, this._limit);
  this._storage[index] = undefined;
};

HashTable.prototype.reHash = function(size) {
  let newHashTable = new HashTable(size);
};

HashTable.prototype.reHashLarger = function() {
  this.reHash(this._limit * 2);
};

HashTable.prototype.reHashSmaller = function() {
  this.reHash(this._limit / 2);
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


