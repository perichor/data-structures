describe('tree', function() {
  var tree;

  beforeEach(function() {
    tree = Tree();
  });

  it('should have methods named "addChild", "removeFromParent", and "contains" and properties named "value" and "parent"', function() {
    expect(tree.addChild).to.be.a('function');
    expect(tree.removeFromParent).to.be.a('function');
    expect(tree.contains).to.be.a('function');
    expect(tree.hasOwnProperty('value')).to.equal(true);
    expect(tree.hasOwnProperty('parent')).to.equal(true);
  });

  it('should add children to the tree', function() {
    tree.addChild(5);
    expect(tree.children[0].value).to.equal(5);
  });

  it('should return true for a value that the tree contains', function() {
    tree.addChild(5);
    expect(tree.contains(5)).to.equal(true);
  });

  it('should return false for a value that was not added', function() {
    tree.addChild(5);
    expect(tree.contains(6)).to.equal(false);
  });

  it('should be able to add children to a tree\'s child', function() {
    tree.addChild(5);
    tree.children[0].addChild(6);
    expect(tree.children[0].children[0].value).to.equal(6);
  });

  it('should correctly detect nested children', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[0].addChild(8);
    expect(tree.contains(7)).to.equal(true);
    expect(tree.contains(8)).to.equal(true);
  });

  it('should remove branch starting at target node', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);

    tree.children[0].children[0].addChild(3);
    tree.children[0].children[0].addChild(4);
    tree.children[0].children[0].addChild(5);

    let removedBranch = tree.removeFromParent(7);
    expect(removedBranch.contains(3)).to.equal(true);
    expect(removedBranch.contains(4)).to.equal(true);
    expect(removedBranch.contains(5)).to.equal(true);
    expect(removedBranch.contains(7)).to.equal(true);

    expect(tree.contains(7)).to.equal(false);
    expect(tree.contains(3)).to.equal(false);
    expect(tree.contains(4)).to.equal(false);
  });

  it('should return undefined if value specified to removeFromParent does not exist', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);

    tree.children[0].children[0].addChild(3);
    tree.children[0].children[0].addChild(4);
    tree.children[0].children[0].addChild(5);

    let removedBranch = tree.removeFromParent(10);
    expect(removedBranch).to.equal(undefined);

  });

  it('should invoke provided callback function on each element in a tree', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);

    tree.children[0].children[0].addChild(3);
    tree.children[0].children[0].addChild(4);
    tree.children[0].children[0].addChild(5);

    let array = [];
    let pusher = function(node) {
      array.push(node.value);
    };
    tree.traverse(pusher);
    expect(array).to.deep.equal([undefined, 5, 7, 3, 4, 5, 6, 8]);

  });



});
