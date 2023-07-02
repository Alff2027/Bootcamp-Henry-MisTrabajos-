

function agregaPropiedad(amigos, propiedad) {
  // La funcion llamada 'agregaPropiedad' recibe como argumento un array llamado 'amigos' que contiene
  // en cada posición del arreglo un objeto que puede tener como propiedades 'nombre' o 'edad'. También
  // recibe un string llamado 'propiedad'.
  // Esta funcion debe agregar la propiedad 'propiedad' y setearla en null a aquellos objetos dentro de 'amigos' que no tengan esa propiedad
  // Debe devolver el array 'amigos' modificado.
  // Nota: Si el objeto dentro de 'amigos' tiene esa 'propiedad' no modificarla.
  // Ej:
  // var amigos = [{ nombre: 'toni' } , { nombre: 'Emi', edad: 25 }];
  // agregaPropiedad(amigos, 'edad') debe devolver [{ nombre: 'toni', edad: null } , { nombre: 'Emi', edad: 25 }]
  const arr = [...amigos]

  for (let obj of arr) {
    if (!obj[propiedad]) {
      obj[propiedad] = null
    }
  }
  return arr
}

const amigos = [{ nombre: 'toni' }, { nombre: 'Emi', edad: 25 }]
console.log(agregaPropiedad(amigos, 'edad'))

