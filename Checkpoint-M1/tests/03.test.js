
/* eslint-disable no-undef */
const {
  LinkedList
} = require('../checkpoint.js');

describe('EJERCICIO 3: compressList', function() {

  var linkedList;
  beforeEach(()=> {
    linkedList = new LinkedList();
  });


  it('Debe devolver una nueva lista que cumpla con la condicion indicada', function() {
    linkedList.add(5);
    linkedList.add(4);
    linkedList.add(9);
    linkedList.add(1);
    linkedList.add(2);

    let result = linkedList.compressList((a,b)=>a+b);
    expect(result.head.value).toBe(9);
    expect(result.head.next.value).toBe(10);
    expect(result.head.next.next).toBeNull();
  });

  it('Debe devolver una nueva lista que cumpla con la condicion indicada', function() {
    linkedList.add(4);
    linkedList.add(3);

    let result = linkedList.compressList((a,b)=>a+b);
    expect(result.head.value).toBe(7);
    expect(result.head.next).toBeNull();
  });

  it('Debe devolver una nueva lista que cumpla con la condicion indicada', function() {
    linkedList.add(4);
    linkedList.add(3);
    linkedList.add(1);
    linkedList.add(2);

    let result = linkedList.compressList((a,b)=>a*b);
    expect(result.head.value).toBe(12);
    expect(result.head.next.value).toBe(2);
    expect(result.head.next.next).toBeNull();
  });

  it('Debe devolver una nueva lista que cumpla con la condicion indicada', function() {
    linkedList.add(4);

    let result = linkedList.compressList((a,b)=>a*b);
    expect(result.head.value).toBe(4);
  });

});
