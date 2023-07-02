/* 
  Importante: 
  No modificar ni el nombre ni los argumetos que reciben las funciones, sólo deben escribir
  código dentro de las funciones ya definidas. 
  No comentar la funcion 
*/
function obtenerSoloLosMejores(estudiantes, nota1, nota2) {
  // "estudiantes" es un array de objetos "estudiante". Crea un nuevo array con el nombre y apellido de los estudiantes
  // que en sus propiedades "check1" y "check2", tengan una nota mayor o igual a "nota1" y "nota2" respectivamente.
  // Ej:
  /* var estudiantes = [
        { nombre: "Mengano", apellido: "Solis", check1: 16, check2: 8},
        { nombre: "Fulano", apellido: "Rodriguez", check1: 20, check2: 20},
        { nombre: "Zutano", apellido: "Alvarez", check1: 10, check2: 0},
        { nombre: "Perengano", apellido: "Leiria", check1: 17, check2: 19}
    ] */
  // obtenerSoloLosMejores(estudiantes, 15, 15); retorna => ["Fulanito Rodriguez", "Perengano Leiria"];
  //
  // Tu código:
  const res = []
  for (let estudiante of estudiantes) {
    if (estudiante.check1 >= nota1 && estudiante.check2 >= nota2) {
      res.push(`${estudiante.nombre} ${estudiante.apellido}`)
    }
  }
  return res
}

var estudiantes = [
  { nombre: 'Mengano', apellido: 'Solis', check1: 16, check2: 8 },
  { nombre: 'Fulano', apellido: 'Rodriguez', check1: 20, check2: 20 },
  { nombre: 'Zutano', apellido: 'Alvarez', check1: 10, check2: 0 },
  { nombre: 'Perengano', apellido: 'Leiria', check1: 17, check2: 19 },
]

console.log(obtenerSoloLosMejores(estudiantes, 15, 15))
// No modifiques nada debajo de esta linea //

module.exports = obtenerSoloLosMejores
