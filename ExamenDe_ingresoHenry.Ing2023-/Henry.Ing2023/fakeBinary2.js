/* 
  Importante: 
  No modificar ni el nombre ni los argumetos que reciben las funciones, sólo deben escribir
  código dentro de las funciones ya definidas. 
  No comentar la funcion 
*/
function fakeBinary2(string) {
  // La funcion llamada 'fakeBinary' recibe como argumento un string con numeros
  // y debe devolver un string en donde se remplaza los numeros menores de 5 con '0'
  // y los numeros iguales o mayores a 5 con '1'
  // Por ej:
  // fakeBinary2('5627') devuelve "1101"
  // fakeBinary("729") devuelve "101"
  // Tu código aca:
  const arr = string.split('')
  const newArr = []
  for (let numberAsSTring of arr) {
    if (Number(numberAsSTring) >= 5) {
      newArr.push(1)
    } else {
      newArr.push(0)
    }
  }
  return newArr.join('')
}

// No modifiques nada debajo de esta linea //

module.exports = fakeBinary2