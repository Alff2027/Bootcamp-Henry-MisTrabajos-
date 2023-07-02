"use strict"

function pedirComida(array) {
  // la funcion recibe un array de objetos en donde se detalla nombre y tipo de dieta de los integrantes de un meeting
  // debe retornar un objeto que diga cuantos menus de que tipo de dieta hay que pedir
  // (a fines practicos solo hay dieta "standard" y "vegan")
  // Por ej:
  // pedirComida([{nombre: "Harry", dieta: "standard"}, {nombre: "Luna", dieta: 'vegan'}, {nombre: "Goyle", dieta: "standard"}])
  // retorna {standard: 2, vegan: 1}
  // Tu código aca:
  let standard = 0
  let vegan = 0
  for (let comenzal of array) {
    if (comenzal.dieta === 'standard') {
      standard++
    } else if (comenzal.dieta === 'vegan') {
      vegan++
    }
  }
  return { standard, vegan }
}

console.log(pedirComida([{nombre: "Harry", dieta: "standard"},
 {nombre: "Luna", dieta: 'vegan'},
  {nombre: "Goyle", dieta: "standard"}]));
  