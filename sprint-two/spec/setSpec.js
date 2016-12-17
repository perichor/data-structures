describe('set', function() {
  var set;

  beforeEach(function() {
    set = Set();
  });

  it('should have methods named "add", "contains", and "remove"', function() {
    expect(set.add).to.be.a('function');
    expect(set.contains).to.be.a('function');
    expect(set.remove).to.be.a('function');
  });

  it('should add values to a set', function() {
    set.add('Susan Sarandon');
    set.add('Danny Glover');
    expect(set.contains('Danny Glover')).to.equal(true);
    expect(set.contains('Susan Sarandon')).to.equal(true);
  });

  it('should remove values from a set', function() {
    set.add('Mel Gibson');
    set.remove('Mel Gibson');
    expect(set.contains('Mel Gibson')).to.equal(false);
  });

  it('should be able to see if it contains a particular object', function() {
    let addedObject = {a: 'apple'};
    let testObject = {a: 'apple'};
    let testObjectTwo = {a: 'banana'};
    set.add(addedObject);
    expect(set.contains(testObject)).to.equal(true);
    expect(set.contains(testObjectTwo)).to.equal(false);
  });


  it('should be able to see if it contains a particular array', function() {
    let addedArray = [1, 2, 1];
    let testArray = [1, 2, 1];
    let testArrayTwo = [1, 2, 3];
    set.add(addedArray);
    expect(set.contains(testArray)).to.equal(true);
    expect(set.contains(testArrayTwo)).to.equal(false);
  });

});
