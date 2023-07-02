/* eslint-disable no-undef */
const {
  specialSort
} = require('../checkpoint.js');

describe('EJERCICIO 9: specialSort', function() {

  let array = [
      {title: 'Comprar tomate', description: 'Ir a la verduleria a comprar tomate', priority: 4, price: 300},
      {title: 'Ir al gimnasio', description: 'Ir al gimnasio', priority: 4, price: 200},
      {title: 'Comprar harina', description: 'Ir al supermercado a comprar harina', priority: 2, price: 200},
      {title: 'Comprar libro', description: 'Ir a la libreria', priority: 2, price: 700}
  ];

  var sortPriorityAsc = function(one, two) {
    if(one.priority === two.priority) {
      if(one.price > two.price) return 1;
      else return -1;
    }
    if(one.priority > two.priority) return 1;
    return -1
  };

  let arrayPriorityAsc = [
    {title: 'Comprar tomate', description: 'Ir a la verduleria a comprar tomate', priority: 4, price: 300},
    {title: 'Ir al gimnasio', description: 'Ir al gimnasio', priority: 4, price: 200},
    {title: 'Comprar libro', description: 'Ir a la libreria', priority: 2, price: 700},
    {title: 'Comprar harina', description: 'Ir al supermercado a comprar harina', priority: 2, price: 200}
  ];

  var sortPriorityDesc = function(one, two) {
    if(one.priority === two.priority) {
      if(one.price > two.price) return 1;
      else return -1;
    }
    if(one.priority < two.priority) return 1;
    return -1
  };

  let arrayPriorityDesc = [
    {title: 'Comprar libro', description: 'Ir a la libreria', priority: 2, price: 700},
    {title: 'Comprar harina', description: 'Ir al supermercado a comprar harina', priority: 2, price: 200},
    {title: 'Comprar tomate', description: 'Ir a la verduleria a comprar tomate', priority: 4, price: 300},
    {title: 'Ir al gimnasio', description: 'Ir al gimnasio', priority: 4, price: 200},
  ];

  var sortPriceAsc = function(one, two) {
    if(one.price === two.price) {
      if(one.priority > two.priority) return 1;
      else return -1;
    }
    if(one.price > two.price) return 1;
    return -1
  };

  let arrayPriceDesc = [
    {title: 'Comprar libro', description: 'Ir a la libreria', priority: 2, price: 700},
    {title: 'Comprar tomate', description: 'Ir a la verduleria a comprar tomate', priority: 4, price: 300},
    {title: 'Ir al gimnasio', description: 'Ir al gimnasio', priority: 4, price: 200},
    {title: 'Comprar harina', description: 'Ir al supermercado a comprar harina', priority: 2, price: 200}
  ];

  it('Debe retornar el arreglo ordenado ascendentemente por prioridad', function() {
    expect(specialSort(array, sortPriorityAsc)).toEqual(arrayPriorityAsc);
  });

  it('Debe retornar el arreglo ordenado descendentemente por prioridad', function() {
    expect(specialSort(array, sortPriorityDesc)).toEqual(arrayPriorityDesc);
  });

  it('Debe retornar el arreglo ordenado descendentemente por precio', function() {
    expect(specialSort(array, sortPriceAsc)).toEqual(arrayPriceDesc);
  });
});
