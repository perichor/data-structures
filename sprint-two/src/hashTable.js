

var HashTable = function(storageLimit) {
  if (storageLimit === undefined) {
    this._limit = 8;
  } else {
    this._limit = storageLimit;
  }
  this._storage = LimitedArray(this._limit);
  this._itemCount = 0;
};

HashTable.prototype.insert = function(key, value) {
  this.insertWithoutResize(key, value);
  this.checkStorageResize();
};

HashTable.prototype.insertWithoutResize = function(key, value) {
  var index = getIndexBelowMaxForKey(key, this._limit);
  if (this._storage.get(index) === undefined) {
    this._storage.set(index, {});
    this._storage.get(index)[key] = value;
    this._itemCount += 1;
  } else {
    if (!this._storage.get(index).hasOwnProperty(key)) {
      this._itemCount += 1;
    }
    this._storage.get(index)[key] = value;
  }
};

HashTable.prototype.retrieve = function(key) {
  var index = getIndexBelowMaxForKey(key, this._limit);
  if (this._storage.get(index) === undefined) {
    return undefined;
  } else {
    return this._storage.get(index)[key];
  }
};

HashTable.prototype.remove = function(key) {
  var index = getIndexBelowMaxForKey(key, this._limit);
  if (this._storage.get(index) !== undefined && this._storage.get(index).hasOwnProperty(key)) {
    delete this._storage.get(index)[key];
    if (Object.keys(this._storage.get(index)).length === 0) {
      this._storage.set(index, undefined);
    }
    this._itemCount -= 1;
    this.checkStorageResize();
  }
};

HashTable.prototype.reHash = function(size) {
  let newHashTable = new HashTable(size);
  for (let i = 0; i < this._limit; i++) {
    if (this._storage.get(i) !== undefined) {
      for (let key in this._storage.get(i)) {
        newHashTable.insertWithoutResize(key, this._storage.get(i)[key]);
      }
    }
  }
  this._limit = newHashTable._limit;
  this._storage = newHashTable._storage;
};

HashTable.prototype.reHashLarger = function() {
  this.reHash.call(this, this._limit * 2);
};

HashTable.prototype.reHashSmaller = function() {
  this.reHash.call(this, this._limit / 2);
};

HashTable.prototype.checkStorageResize = function() {
  if (this._itemCount / this._limit > 0.75) {
    this.reHashLarger();
  } else if (this._itemCount / this._limit < 0.25) {
    this.reHashSmaller();
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


