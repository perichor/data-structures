

// Instantiate a new graph
var Graph = function() {
  this.nodeList = [];
  this.edgeList = [];
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  this.nodeList.push(node);
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  return this.nodeList.includes(node);
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
  this.nodeList.splice(this.nodeList.indexOf(node), 1);
  var currentEdge = undefined;
  for (let i = this.edgeList.length - 1; i >= 0; i--) {
    currentEdge = this.edgeList[i];
    if (currentEdge.includes(node)) {
      currentEdge.splice(i, 1);
    }
  }
};

Graph.prototype._edgeIndexOf = function(fromNode, toNode) {
  for (let i = 0; i < this.edgeList.length; i++) {
    let currentEdge = this.edgeList[i];
    if ((currentEdge[0] === fromNode) && (currentEdge[1] === toNode)) {
      return i;
    }
    if ((currentEdge[0] === toNode) && (currentEdge[1] === fromNode)) {
      return i;
    }
  }
  return -1;
};
// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  if (this._edgeIndexOf(fromNode, toNode) === -1) {
    return false;
  } else {
    return true;
  }
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  this.edgeList.push([fromNode, toNode]);
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  this.edgeList.splice(this._edgeIndexOf(fromNode, toNode), 1);
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  this.nodeList.forEach(cb);
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


