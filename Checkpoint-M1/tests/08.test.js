/* eslint-disable no-undef */
const {
  BinarySearchTree
} = require('../checkpoint.js');

describe('EJERCICIO 8: balanced BinarySearch', function() {

  it('Debería devolver true para el descripto', function() {
    var tree = new BinarySearchTree(16);
    tree.insert(7);
    tree.insert(20);
    tree.insert(25);
    tree.insert(15);
    tree.insert(9);
    expect(tree.balanced()).toBe(true);
  });

  it('Debería devolver false para el descripto', function() {
    var tree = new BinarySearchTree(16);
    tree.insert(10);
    tree.insert(9);
    tree.insert(8);
    tree.insert(7);
    tree.insert(6);
    expect(tree.balanced()).toBe(false);
  });
});
