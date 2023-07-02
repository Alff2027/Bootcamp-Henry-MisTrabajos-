// resolve estos ejercicios usando recursión

// Implementa la clase LinkedList
// tiene metodos `add`, `remove`, y `search`
// add: Agrega un valor en el final de la lista. Modifica solo el puntero tail.
// Ej:      Head --> null
// add(1):  Head --> 1 --> null
// add(2):  Head --> 1 --> 2 --> null
// remove:  Eliminar el último nodo de la lista y devuelve su valor. Resuelve correctamente una lista de un solo nodo.
// Ej:         Head --> 1
// remove():   Head --> null y devuelve 1
// search: Busca un valor dentro de la lista. Puede recibir un valor o una función. Si no hubiera resultados, devuelve null.

function LinkedList() {
  this.head = null;
  ////////////////////////
  this.add = add;
  this.remove = remove;
  this.search = search;

  //ADD
  function add(data, current = this.head) {
    if (this.head === null) {
      return this.head = new Node(data)
    }
    if (current.next === null) {
      return current.next = new Node(data)
    }
    this.add(data, current.next)
  }
  //REMOVE
  function remove(current = this.head) {
    if (this.head === null) return null;

    if (this.head.next === null) {
      var value = this.head.value;
      this.head = null;
      return value;
    }

    if (current.next.next !== null) {
      current = current.next;
      this.remove();
    }
    var value = current.next.value;
    current.next = current.next.next;
    return value; // no match found
  }
  //SEARCH
  function search(value, current = this.head) {
    if (typeof value === 'function') {
      if (value(current.value)) {
        return current.value;
      } else {
        return this.search(value, current.next)
      }
    }
    if (current !== null) {
      if (current.value === value) {
        return current.value;
      } else {
        return this.search(value, current.next)
      }
    }
    return null;
  }
  //END
}

function Node(value) {
  this.value = value;
  this.next = null;
}


// Hash Table
// Una hash table contiene un arreglo de "contenedores" donde puede guardar información.
// Para guardar un valor asociado a una key (string):
//    - Correr la key a través de una función hash para transformarla a un número entero.
//    - Usar ese número como índice para ver en cuál contenedor guardarás el valor.
// Para buscar el valor por su key:
//    - Correr la key por la función hash para conseguir el número.
//    - Usar el número para buscar el contenedor donde está el valor.
//    - Devolver el valor.

function HashTable() {
  this.numBuckets = 35;
  this.buckets = [];
}


// function hash(nombre) {
//   return nombre.length
// }

HashTable.prototype.hash = function(value) {
  var total = 0;
  for( var i = 0; i < value.length; i++) {
    total = total + value.charCodeAt(i);
  }

  return total % this.numBuckets; // numero entre 0 y 35
}
// "toni"
// index = 2

// 'nito'

// [null, [{key: 'toni', value: 30},{key:'nito', value: 35}]]


// [{key: 'toni', value: 30}]



HashTable.prototype.set = function(key, value) {
  if(typeof key !== 'string') {
    throw new TypeError('Keys must be strings');
  }

  var index = this.hash(key); // me da el indice 

  if(!this.buckets[index]) { // caso en el que no tengo nada en esa posicion, creo un array vacio
    this.buckets[index] = [];
  }



  for(var i = 0; i < this.buckets[index].length; i++) {
    if(this.buckets[index][i].key === key) {
      this.buckets[index][i].value = value
      return;
    }
  }

  var data = {
    key,
    value
  }

  this.buckets[index].push(data);

  // this.buckets[index] = value;
}

// [null, [{key: 'toni', value: 31}, {key:'nito', value: 35}]]

HashTable.prototype.get = function(key) {
  if(typeof key !== 'string') {
    throw new TypeError('Keys must be strings');
  }
  var index = this.hash(key);

  for(var i = 0; i < this.buckets[index].length; i++) {
    if(this.buckets[index][i].key === key) {
      return this.buckets[index][i].value;
    }
  }
  return false;

  // return this.buckets[index];
}

HashTable.prototype.hasKey = function(key) {
  // var found = this.get(key)

  // if(found === false) {
  //   return false
  // } else {
  //   return true;
  // }

  return !!this.get(key);
}

// Do not modify code below this line.
// --------------------------------

module.exports = {
  Node,
  LinkedList,
  HashTable
};