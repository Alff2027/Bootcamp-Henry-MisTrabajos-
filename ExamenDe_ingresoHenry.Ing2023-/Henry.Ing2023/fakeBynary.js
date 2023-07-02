/* 
  Importante: 
  No modificar ni el nombre ni los argumetos que reciben las funciones, sólo deben escribir
  código dentro de las funciones ya definidas. 
  No comentar la funcion 
*/
function fakeBinary(size) {
  // La funcion llamada 'fakeBinary' recibe como argumento size(tamaño) que es un numero (entero)
  // y debe devolver un string de 1s y 0s con el tamaño indicado.
  // siempre empieza por 1
  // Por ej:
  // fakeBinary(10) devuelve "1010101010"
  // fakeBinary(3) devuelve "101"
  // Tu código aca:
  let binary = '1'
  for (let i = 1; i < size; i++) {
    if (i % 2 !== 0) {
      binary += '0'
    } else {
      binary += '1'
    }
  }
  return binary
}

console.log(fakeBinary(10))

// No modifiques nada debajo de esta linea //

module.exports = fakeBinary
