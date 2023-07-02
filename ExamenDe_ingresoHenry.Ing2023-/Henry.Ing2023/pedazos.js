/* 
  Importante: 
  No modificar ni el nombre ni los argumetos que reciben las funciones, sólo deben escribir
  código dentro de las funciones ya definidas. 
  No comentar la funcion 
*/

function pedazos(array, cantidad) {
  // La funcion pedazos recibe un arreglo llamado 'array' y un numero entero llamado 'cantidad'
  // Esta debe separar el array recibido en N subarreglos que tengan como máximo el numero recibido en cantidad de elementos.
  // Por ejemplo:
  // pedazos([1,2,3,4,5], 2) -> retorna [[1,2], [3,4], [5]);
  // pedazos([1,2,3,4,5], 4) -> retorna [[1,2,3,4], [5]);
  // pedazos{[1,2],4) -> retorna [[1,2]];

  const subArrs = [[]]
  const copy = [...array]
  while (copy.length > 0) {
    let current = copy.shift()
    if (subArrs[subArrs.length - 1].length < cantidad) {
      subArrs[subArrs.length - 1].push(current)
    } else {
      subArrs.push([current])
    }
  }
  return subArrs
}

console.log(pedazos([1, 2, 3, 4, 5], 2))
console.log(pedazos([1, 2, 3, 4, 5], 4))
console.log(pedazos([1, 2], 4))
// No modifiques nada debajo de esta linea //

module.exports = pedazos
