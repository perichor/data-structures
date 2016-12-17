var Set = function() {
  var set = Object.create(setPrototype);
  set._storage = []; // fix me
  return set;
};

var setPrototype = {};

setPrototype.add = function(item) {
  if (!this._storage.includes(item)) {
    this._storage.push(item);
  }
};

setPrototype.contains = function(targetItem) {
  return _.some(this._storage, function(currentItem) {
    return _.isEqual(currentItem, targetItem);
  });
};

setPrototype.remove = function(item) {
  if (this._storage.includes(item)) {
    this._storage.splice(this._storage.indexOf(item), 1);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 * add == O(1)
 * contains == O(n)
 * remove == O(n); note that research indicates Array.splice is O(n)
 */
