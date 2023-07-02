/* 
  Importante: 
  No modificar ni el nombre ni los argumetos que reciben las funciones, sólo deben escribir
  código dentro de las funciones ya definidas. 
  No comentar la funcion 
*/
function sumaTodosPrimos(array) {
  // La funcion llamada 'sumaTodosPrimos' recibe como argumento un array de enteros.
  // y debe devolver la suma total entre todos los numeros que sean primos.
  // Pista: un número primo solo es divisible por sí mismo y por 1
  // Nota: Los números 0 y 1 NO son considerados números primos
  // Ej:
  // sumaTodosPrimos([1, 5, 2, 9, 3, 4, 11]) devuelve 5 + 2 + 3 + 11 = 21
  // Nota: Podes usar la funcion 'esPrimo' resuelta en la homework JSII.

  // Tu código aca:
  const isPrime = (num) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
      if (num % i === 0) return false
    return num > 1
  }

  let acumulador = 0
  for (let e of array) {
    if (isPrime(e)) {
      acumulador += e
    }
  }
  return acumulador
}

console.log(sumaTodosPrimos([1, 5, 2, 9, 3, 4, 11]))
// No modifiques nada debajo de esta linea //

module.exports = sumaTodosPrimos
