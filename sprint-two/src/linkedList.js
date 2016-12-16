var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    var newNode = Node(value);

    if (list.tail !== null) {
      list.tail.next = newNode;
    } else {
      list.head = newNode;
    }
    list.tail = newNode;
  };

  list.removeHead = function() {
    let currentHead = list.head;

    // Test if there is only one node in the linked list
    if (list.head === list.tail) {
      list.tail = null;
    }

    list.head = list.head.next;

    return currentHead.value;
  };

  list.contains = function(target) {

    let currentNode = list.head;

    let hasFoundMatchtoTarget = false;

    while (currentNode !== null) {
      if (currentNode.value === target) {
        return true;
      }
      currentNode = currentNode.next;
    }

    return hasFoundMatchtoTarget; 
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

 // addToTail: O(1);
 // removeHead: O(1);
 // contains: O(n);
