"use strict"

function mayorMenor(numeros) {
  // La función llamada 'mayorMenor' recibe como argumento un arreglo de números llamado 'numeros' y debe devolver un
  // arreglo que contenga el mayor número del arreglo 'numeros' en la posición cero y el menor número del arreglo
  // 'numeros' en la posición uno.
  // Ej:
  // mayorMenor([9, 17, 6, 2, 4]) debe retornar [17, 2]
  // ya que 17 es el número más grande (mayor) dentro del arreglo [9, 17, 6, 2, 4]
  // y 2 es el número más chico (menor) dentro del arreglo [9, 17, 6, 2, 4]
  // Tu código aca:
  return [Math.max(...numeros), Math.min(...numeros)];
}

console.log(mayorMenor([9, 17, 6, 2, 4]))


