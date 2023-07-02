// resolve estos ejercicios usando recursión

// Binary Seach Tree
// 'tiene metodos llamados `insert`, `contains`, `depthFirstForEach`, 'breadthFirstForEach' y 'size'
// corre depth-first (en recorrido "in-order") cuando depthFirstForEach() es ejecutado sin ninguna opcion o con la opcion "in-order
// corre depth-first (en recorrido "pre-order") cuando depthFirstForEach() es ejecutado con la opcion "pre-order"
// corre depth-first (en recorrido "post-order" cuando depthFirstForEach() es ejecutado con la opcion "post-order"
// corre breadth-first cuando breadthFirstForEach() es ejecutado
// Observar imagen de la carpeta "homework" llamada "bst.png". Allí encontraran dibujado el arbol utilizado para los tests

function BinarySearchTree(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.root = null;
}

BinarySearchTree.prototype.insert = function (value) {


  var newNode = new BinarySearchTree(value);

  // root is null then node will 
  // be added to the tree and made root. 
  if (this.root === null) {
    this.root = newNode;
  } else {
    // find the correct position in the  
    // tree and add the node 
    insertNode(this.root, newNode);
  }

  function insertNode(node, newNode) {
    // if the data is less than the node 
    // data move left of the tree  
    if (newNode.value < node.value) {
      // if left is null insert node here 
      if (node.left === null)
        node.left = newNode;
      else

        // if left is not null recur until  
        // null is found 
        insertNode(node.left, newNode);
    }

    // if the data is more than the node 
    // data move right of the tree  
    else {
      // if right is null insert node here 
      if (node.right === null)
        node.right = newNode;
      else

        // if right is not null recur until  
        // null is found 
        insertNode(node.right, newNode);
    }
  }

  return this.root;
}

BinarySearchTree.prototype.contains = function (params) {

}

BinarySearchTree.prototype.size = function () {
  // caso base
  if (this.left === null && this.right === null) return 1;

  if (this.right !== null && this.left !== null) { // si tengo los dos hijos
    return 1 + this.right.size() + this.left.size();
  }

  if (this.right !== null && this.left === null) { // tengo solo hijo a la derecha
    return 1 + this.right.size();
  }

  if (this.left !== null && this.right === null) { // si tengo solo hijo a la izquierda
    return 1 + this.left.size();
  }

}

BinarySearchTree.prototype.depthFirstForEach = function (params) {

}

BinarySearchTree.prototype.breadthFirstForEach = function (params) {

}
// Do not modify code below this line.
// --------------------------------

module.exports = {
  BinarySearchTree
};