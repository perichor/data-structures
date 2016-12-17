var Tree = function(value, parent) {
  var newTree = {};
  newTree.value = value;

  newTree.addChild = treeMethods.addChild;
  newTree.contains = treeMethods.contains;
  newTree.removeFromParent = treeMethods.removeFromParent;
  if (parent === undefined) { 
    newTree.parent = null;
  } else {
    newTree.parent = parent;
  }
  newTree.children = [];

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  let newChild = Tree(value, this);
  this.children.push(newChild);
};

treeMethods.removeFromParent = function(target) {
  var traverser = function(target, hasFound) {
    if (this.value === target) {
      let currentParent = this.parent;
      currentParent.children.splice(currentParent.children.indexOf(this), 1);
      this.parent = null;
      return this;

    } else {
      this.children.forEach( function(child) {
        if (hasFound === undefined) { 
          hasFound = traverser.call(child, target, hasFound);
        }
      });
      return hasFound;
    }
  };
  return traverser.call(this, target, undefined);
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
// addChild: O(1);
// contains: O(n);