var BinarySearchTree = function(value) {
  let BSTInstance = {};
  BSTInstance.left = undefined;
  BSTInstance.right = undefined;
  BSTInstance.value = value;

  BSTInstance.insert = function(targetValue) {
    if (this.value === targetValue) {
      return undefined;
    }

    if (this.value > targetValue) {
      if (this.left === undefined) {
        this.left = BinarySearchTree(targetValue);
      } else {
        this.left.insert(targetValue);
      }
    }

    if (this.value < targetValue) {
      if (this.right === undefined) {
        this.right = BinarySearchTree(targetValue);
      } else {
        this.right.insert(targetValue);
      }
    }

  };

  BSTInstance.contains = function(targetValue) {
    if (this.value === targetValue) {
      return true;
    }

    if (this.value > targetValue) {
      if (this.left === undefined) {
        return false;
      } else {
        return this.left.contains(targetValue);
      }
    }

    if (this.value < targetValue) {
      if (this.right === undefined) {
        return false;
      } else {
        return this.right.contains(targetValue);
      }      
    }
  };

  BSTInstance.depthFirstLog = function(userFunction) {
    userFunction(this.value);
    if (this.left !== undefined) {
      this.left.depthFirstLog(userFunction);
    } 
    if (this.right !== undefined) {
      this.right.depthFirstLog(userFunction);
    }
  };

  BSTInstance.breadthFirstLog = function(userFunction) {
    let executionQueue = [this];
    for (let i = 0; i < executionQueue.length; i++) {
      userFunction(executionQueue[i]);
      if (executionQueue[i].left !== undefined) {
        executionQueue.push(executionQueue[i].left);
      }
      if (executionQueue[i].right !== undefined) {
        executionQueue.push(executionQueue[i].right);
      }
    }
  };

  return BSTInstance;
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
 // Worst case time complexity for all operations of a BST = O(n);
 // Average case time complexity of all operations of a BST = O(log n);
