

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
    // No collision 
    this._storage.set(index, []);
    this._storage.get(index).push([key, value]);
    this._itemCount += 1;
  } else {
    // Override Test
    if (!this._bucketHasKey(this._storage.get(index), key)) {
      // Collision
      this._storage.get(index).push([key, value]);
      this._itemCount += 1;
    } else {
      // Override existing key-value pair
      this._bucketReplaceKey(this._storage.get(index), key, value);
    }
  }
};

HashTable.prototype._bucketReplaceKey = function(bucket, key, value) {
  if (this._bucketRetrieveKeyIndex(bucket, key) !== undefined) {
    let i = this._bucketRetrieveKeyIndex(bucket, key);
    bucket[i] = [key, value];
  }
};

HashTable.prototype._bucketRetrieveKeyIndex = function(bucket, key) {
  for (let i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === key) {
      return i;
    }
  }
  return undefined;
};

HashTable.prototype._bucketHasKey = function(bucket, key) {
  if (this._bucketRetrieveKeyIndex(bucket, key) !== undefined) {
    return true;
  } else {
    return false;
  }
};

HashTable.prototype.retrieve = function(key) {
  var index = getIndexBelowMaxForKey(key, this._limit);
  if (this._storage.get(index) === undefined) {
    return undefined;
  } else {
    let keyIndex = this._bucketRetrieveKeyIndex(this._storage.get(index), key);
    return this._storage.get(index)[keyIndex][1];
  }
};

HashTable.prototype.remove = function(key) {
  var index = getIndexBelowMaxForKey(key, this._limit);
  if (this._storage.get(index) !== undefined && this._bucketHasKey(this._storage.get(index), key)) {
    let indexOfKeyToBeRemoved = this._bucketRetrieveKeyIndex(this._storage.get(index), key);

    this._storage.get(index).splice(indexOfKeyToBeRemoved, 1);
    if (this._storage.get(index).length === 0) {
      this._storage.set(index, undefined);
    }
    this._itemCount -= 1;
    this.checkStorageResize();
  }
};

HashTable.prototype.reHash = function(size) {
  let newHashTable = new HashTable(size);
  for (let i = 0; i < this._limit; i++) {
    let currentArrayofKeyValuePairs = this._storage.get(i);
    if (currentArrayofKeyValuePairs !== undefined) {
      for (let j = 0; j < currentArrayofKeyValuePairs.length; j++) {
        let currentKeyToBeRehashed = currentArrayofKeyValuePairs[j][0];
        let currentValueToBeRehashed = currentArrayofKeyValuePairs[j][1];
        newHashTable.insertWithoutResize(currentKeyToBeRehashed, currentValueToBeRehashed);
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


