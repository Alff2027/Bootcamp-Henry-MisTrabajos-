/* 
  Importante: 
  No modificar ni el nombre ni los argumetos que reciben las funciones, sólo deben escribir
  código dentro de las funciones ya definidas. 
  No comentar la funcion 
*/
// EN ESTE EJERCICIO PASAN 3 EXPECT SON LOS QUE INDICAN QUE NO UTILIZAS LOS METODOS (values, keys, entries)
function intercambio(objeto) {
  // Devolver un objeto con los pares clave-valor intercambiados.
  // Ej: intercambio({ nombre: "Fulano", apellido: "Rodriguez" }); devuelve => { Fulano: "nombre", Rodriguez: "apellido" }
  // NOTA: No utilizar métodos de Object (values, keys, entries);
  //
  // Tu código:
  const newObj = {}
  for (let prop in objeto) {
    newObj[objeto[prop]] = prop
  }
  return newObj
}

const ejemplo = { nombre: 'Fulano', apellido: 'Rodriguez' }

console.log(intercambio(ejemplo))

// No modifiques nada debajo de esta linea //

module.exports = intercambio
