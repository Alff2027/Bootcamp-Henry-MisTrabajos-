/* eslint-disable no-undef */
const {
  LinkedList
} = require('../checkpoint.js');

describe('EJERCICIO 5: insertInOrder', function() {
  var linkedList = new LinkedList();

  it('Debe ingresar los valores en el orden esperado', function () {
      linkedList.insertInOrder(7);
      linkedList.insertInOrder(2);
      expect(linkedList.head.value).toBe(7);
      expect(linkedList.head.next.value).toBe(2);

      linkedList.insertInOrder(8);
      expect(linkedList.head.value).toBe(8);
      expect(linkedList.head.next.value).toBe(7);
      expect(linkedList.head.next.next.value).toBe(2);

      linkedList.insertInOrder(5);
      expect(linkedList.head.value).toBe(8);
      expect(linkedList.head.next.value).toBe(7);
      expect(linkedList.head.next.next.value).toBe(5);
      expect(linkedList.head.next.next.next.value).toBe(2);

      linkedList.insertInOrder(6);
      expect(linkedList.head.value).toBe(8);
      expect(linkedList.head.next.value).toBe(7);
      expect(linkedList.head.next.next.value).toBe(6);
      expect(linkedList.head.next.next.next.value).toBe(5);
      expect(linkedList.head.next.next.next.next.value).toBe(2);
  });
});
