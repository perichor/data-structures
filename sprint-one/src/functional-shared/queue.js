var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var instance = {};

  instance.storage = {};
  instance.enqueue = queueMethods.enqueue;
  instance.dequeue = queueMethods.dequeue;
  instance.size = queueMethods.size;
  return instance;
};

var queueMethods = {};

queueMethods.enqueue = function(value) {
  this.storage[Object.keys(this.storage).length] = value;
};

queueMethods.dequeue = function() {
  let dequeuedItem = this.storage[0];
  for (let i = 1; i < Object.keys(this.storage).length; i++) {
    this.storage[i - 1] = this.storage[i];
  }
  delete this.storage[Object.keys(this.storage).length - 1];
  return dequeuedItem;
};

queueMethods.size = function() {
  return Object.keys(this.storage).length;
};