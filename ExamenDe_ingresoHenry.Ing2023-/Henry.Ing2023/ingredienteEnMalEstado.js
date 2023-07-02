

function ingredienteEnMalEstado(menu = {}, comida = '', ingrediente = '') {
  
  // Tu código:
  //buscaremos si la comida tiene el ingrediente malogrado
  let hayIngredienteMalogrado = false
  for (let ing of menu[comida]) {
    if (ing === ingrediente) {
      hayIngredienteMalogrado = true
    }
  }
  if (hayIngredienteMalogrado) {
    //ejecutar la logica para el ingrediente malogrado

    //en que indice esta el ingrediente malogrado
    let indiceMalogrado
    for (let i = 0; i < menu[comida].length; i++) {
      if (menu[comida][i] === ingrediente) {
        indiceMalogrado = i
      }
    }

    //devolver los ingredientes malogrados, tenemos 3 casos
    // al inicio, al medio, y al final
    if (indiceMalogrado === 0) {
      //al inicio
      return [menu[comida][0], menu[comida][1]]
    } else if (indiceMalogrado === menu[comida].length - 1) {
      //al final
      return [
        menu[comida][menu[comida].length - 2],
        menu[comida][menu[comida].length - 1],
      ]
    } else {
      //en el medio
      return [
        menu[comida][indiceMalogrado - 1],
        menu[comida][indiceMalogrado],
        menu[comida][indiceMalogrado + 1],
      ]
    }
  } else {
    //si no hay ingrediente malogrado
    return 'El menú está pefecto'
  }
}

//PROBANDO EL CODEX: 
let menuDelDia = {
  raviolesConSalsa: ['Harina', 'Sal', 'Huevos', 'Aceite', 'Peceto', 'Ricota'],
  bagnaCauda: ['Ajo', 'Anchoas', 'Aceite', 'Crema', 'Papas', 'Zanahorias'],
  tallarines: ['Harina', 'Pollo', 'Aceite', 'Huevos', 'Tomates', 'Cebolla'],
}

//PROBANDO EL CODEX:

console.log('Peceto')
console.log(ingredienteEnMalEstado(menuDelDia, 'raviolesConSalsa', 'Peceto'))
console.log('Aceite')
console.log(ingredienteEnMalEstado(menuDelDia, 'tallarines', 'Aceite'))
console.log('Pinia')
console.log(ingredienteEnMalEstado(menuDelDia, 'tallarines', 'Pinia'))


