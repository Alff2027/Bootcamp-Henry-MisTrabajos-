/* 
  Importante: 
  No modificar ni el nombre ni los argumetos que reciben las funciones, sólo deben escribir
  código dentro de las funciones ya definidas. 
  No comentar la funcion 
*/
function puntosDelEquipo(array) {
  // la funcion recibe un array con los resultados de los partidos del campeonato de futbol de un equipo
  // en este formato ["3:1", "2:2", "0:1", ...]
  //la funcion debe calcular y retornar cuantos puntos consiguio el equipo teniendo en cuenta:
  //que su resultado es el primero en cada string
  // un partido ganado suma 3 puntos, empate suma 1 punto, y perder 0!
  // Tu código aca:
  let puntos = 0

  for (let score of array) {
    let newarray = score.split(':')
    let golesNuestroEquipo = +newarray[0]
    let golesEquipoEnemigo = +newarray[1]
    if (golesNuestroEquipo > golesEquipoEnemigo) {
      puntos += 3
    } else if (golesEquipoEnemigo === golesNuestroEquipo) {
      puntos += 1
    } else if (golesNuestroEquipo < golesEquipoEnemigo) {
      puntos += 0
    }
    console.log({ puntos })
  }
  return puntos
}

let resultados = ['3:1', '2:2', '0:1', '1:0', '2:1', '1:2', '1:1']
//3,1,0,3,3,0,1
console.log(puntosDelEquipo(resultados))

// No modifiques nada debajo de esta linea //

module.exports = puntosDelEquipo
