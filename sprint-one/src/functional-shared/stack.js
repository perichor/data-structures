var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var instance = {};

  instance.storage = {};
  instance.push = stackMethods.push;
  instance.pop = stackMethods.pop;
  instance.size = stackMethods.size;

  return instance;
};

var stackMethods = {};

stackMethods.push = function(value) {
  this.storage[Object.keys(this.storage).length] = value;
};

stackMethods.pop = function() {
  let poppedValue = this.storage[Object.keys(this.storage).length - 1];
  
  delete this.storage[Object.keys(this.storage).length - 1];
  return poppedValue;
};

stackMethods.size = function() {
  return Object.keys(this.storage).length;
};