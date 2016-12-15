var Tree = function(value) {
  var newTree = {};
  newTree.value = value;

  newTree.addChild = treeMethods.addChild;
  newTree.contains = treeMethods.contains;
  newTree.children = [];

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  let newChild = Tree(value);
  this.children.push(newChild);
};

treeMethods.contains = function(target) {
  var traverser = function(target, hasFound) {
    if (this.value === target) {
      hasFound = true;
    } else {
      this.children.forEach( function(child) {
        hasFound = traverser.call(child, target, hasFound);
      });
    }
    return hasFound;
  };
  return traverser.call(this, target, false);
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
