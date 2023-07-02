/* eslint-disable no-undef */
const {
  LinkedList
} = require('../checkpoint.js');

describe('EJERCICIO 4: removeFrom', function() {

    let linkedList;
    beforeEach(()=> {
      linkedList = new LinkedList();
      linkedList.add(5);
      linkedList.add(10);
      linkedList.add(3);
      linkedList.add(2);
      linkedList.add(9);
    });


  it('Debe eliminar el elemento que se encuentra en el indice 3', function() {
    linkedList.removeFrom(3);
    expect(linkedList.head.value).toBe(5);
    expect(linkedList.head.next.value).toBe(10);
    expect(linkedList.head.next.next.value).toBe(3);
    expect(linkedList.head.next.next.next.value).toBe(9);
    expect(linkedList.head.next.next.next.next).toBeNull();
  });

  it('Debe eliminar el elemento que se encuentra en el indice 0', function() {
    linkedList.removeFrom(3);
    linkedList.removeFrom(0);
    expect(linkedList.head.value).toBe(10);
    expect(linkedList.head.next.value).toBe(3);
    expect(linkedList.head.next.next.value).toBe(9);
    expect(linkedList.head.next.next.next).toBeNull();
  });

  it('Debe eliminar el elemento que se encuentra en el indice 1', function() {
    linkedList.removeFrom(3);
    linkedList.removeFrom(0);
    linkedList.removeFrom(1);
    expect(linkedList.head.value).toBe(10);
    expect(linkedList.head.next.value).toBe(9);
    expect(linkedList.head.next.next).toBeNull();
  });

  it('La lista debe quedar vacia si quitamos los ultimos dos elementos', function() {
    linkedList.removeFrom(3);
    linkedList.removeFrom(0);
    linkedList.removeFrom(1);
    linkedList.removeFrom(0);
    linkedList.removeFrom(0);
    expect(linkedList.head).toBeNull();
  });

});
