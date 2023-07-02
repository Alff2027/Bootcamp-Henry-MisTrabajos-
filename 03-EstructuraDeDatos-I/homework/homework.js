// resolve estos ejercicios usando recursión

function nFactorial(n) {
  // devolvé el factorial de n (n!)
  // ej:
  // el factorial de 3 es 6 (3 * 2 * 1)
  if (n === 0 || n === 1) {
    return 1;
  } else if (n < 0) {
    return 0;
  }
  return n * nFactorial(n - 1);
}

function nFibonacci(n) {
  // Secuencia de Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144,…
  // Retorna el enésimo numero de la serie
  // nFibonacci(0) // 0  // el elemento 0 es cero
  // nFibonacci(1) // 1 // el elemento 1 es 1
  // nFibonacci(6) // 1 // el elemento 6 es 8
  if (n < 2) {
    return n;
  } else {
    return (nFibonacci(n - 1) + nFibonacci(n - 2));// Itera hasta que n<2 ,deduce y remplaza las demas nFib(5) = nFib(3)+nFib(2) etc.
  }

}

// Implementa la clase Queue
// enqueue:   Agrega un valor a la queue.   Respeta el orden existente.
// dequeue:   Remueve un valor de la queue.   Obedece a FIFO y respeta el underflow (cuando la queue tiene size cero, o sea, cuando no tiene ningún elemento).
// size:   Devuelve el número de elementos que contiene la queue.

function Queue() {
  this.cola = Array.prototype.slice(0,0); //0 inicio 0 Fin
  this.enqueue = enqueue; //this para tomar la var 
  this.dequeue = dequeue;
  this.size = size;

  function enqueue(element) {
    this.cola.push(element);//"agrego" el metodo enqueue al prototipo de Array
  }

  function dequeue() {
    return this.cola.shift();
  }
  function size() {
    return this.cola.length;
  }
}

// Do not modify code below this line.
// --------------------------------

module.exports = {
  Queue,
  nFactorial,
  nFibonacci
};