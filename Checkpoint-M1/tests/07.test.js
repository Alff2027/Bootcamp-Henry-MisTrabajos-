/* eslint-disable no-undef */
const {
  BinarySearchTree
} = require('../checkpoint.js');

describe('EJERCICIO 7: BinarySearchTree height', function() {

  it('Debe devolver la altura de un arbol', function() {
    var tree = new BinarySearchTree(16);
    expect(tree.height()).toBe(1);
    tree.insert(6);
    expect(tree.height()).toBe(2);
    tree.insert(23);
    expect(tree.height()).toBe(2);
    tree.insert(2);
    expect(tree.height()).toBe(3);
    tree.insert(14);
    expect(tree.height()).toBe(3);
    tree.insert(17);
    expect(tree.height()).toBe(3);
    tree.insert(31);
    expect(tree.height()).toBe(3);
    tree.insert(5);
    expect(tree.height()).toBe(4);
  });

});
