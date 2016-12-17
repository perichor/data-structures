var DoublyLinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    var newNode = Node(value);
    let oldTail = list.tail;
    if (oldTail !== null) {
      oldTail.next = newNode;
      newNode.previous = oldTail;
    } else if (oldTail === null) {
      list.head = newNode;
    }
    list.tail = newNode;
  };

  list.addToHead = function(value) {
    var newNode = Node(value);

    if (list.head !== null) {
      list.head.previous = newNode;
      newNode.next = list.head;
    } else {
      list.tail = newNode;
    }
    list.head = newNode;
  };

  list.removeHead = function() {
    let currentHead = list.head;

    // Test if there is only one node in the linked list
    if (list.head === list.tail) {
      list.tail = null;
      list.head = null;
    } else {
      list.head = list.head.next;
      list.head.previous = null;
    }


    return currentHead.value;
  };

  list.removeTail = function() {
    let currentTail = list.tail;

    // Test if there is only one node in the linked list
    if (list.tail === list.head) {
      list.head = null;
      list.tail = null;
    } else {
      list.tail = list.tail.previous;
      list.tail.next = null;
    }


    return currentTail.value;
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
  node.previous = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

 // addToTail: O(1);
 // removeHead: O(1);
 // contains: O(n);
