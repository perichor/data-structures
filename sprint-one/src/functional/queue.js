var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below

  someInstance.enqueue = function(value) {
    storage[Object.keys(storage).length] = value;
  };

  someInstance.dequeue = function() {
    let dequeuedItem = storage[0];
    for (let i = 1; i < Object.keys(storage).length; i++) {
      storage[i - 1] = storage[i];
    }
    delete storage[Object.keys(storage).length - 1];
    return dequeuedItem;
  };

  someInstance.size = function() {
    return Object.keys(storage).length;
  };

  return someInstance;
};
