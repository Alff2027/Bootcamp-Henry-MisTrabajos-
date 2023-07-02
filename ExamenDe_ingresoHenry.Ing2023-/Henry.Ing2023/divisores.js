/* 
  Importante: 
  No modificar ni el nombre ni los argumetos que reciben las funciones, sólo deben escribir
  código dentro de las funciones ya definidas. 
  No comentar la funcion 
*/
function divisores(numero) {
  // La funcion llamada 'divisores' recibe como argumento un numero (entero)
  // y debe devolver un array con los divisores exactos de 'numero'.
  // Si el numero no tiene divisores ( exeptuando el 1 y el mismo ) deberia devolver el string 'Es primo'
  // Nota: El array no debe contener el 1 y el mismo numero.
  // Por ej:
  // divisores(15) devuelve [3, 5]
  // divisores(11) devuelve 'Es primo'
  // Tu código aca:
  if (numero < 2) {
    return 'esta funcion solo analiza positivos mayores a 1'
  }
  const res = []
  for (let i = 2; i < numero; i++) {
    if (numero % i === 0) {
      res.push(i)
    }
  }
  if (res.length === 0) {
    return 'Es primo'
  }
  return res
}
console.log(divisores(15))
console.log(divisores(11))
// No modifiques nada debajo de esta linea //

module.exports = divisores
