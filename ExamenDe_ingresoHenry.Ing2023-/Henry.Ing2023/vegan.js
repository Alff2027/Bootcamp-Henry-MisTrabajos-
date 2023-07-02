function vegan(invitados) {
  // La funcion llamada "vegan" recibe como argumento un objeto 'invitados', en el objeto tenemos objetos que representan los invitados
  // a una fiesta en donde todos tienen una propiedad "vegan" con un boolean.
  // debe retornar la cantidad de invitados que son vegan.
  // Por ej:
  // let invitados = {
  //     Luna: {
  //         vegan: false
  //     },
  //     Sebas: {
  //         vegan: false
  //     },
  //     Marce: {
  //         vegan: false
  //     },
  //     Nicky: {
  //         vegan: true
  //     }
  // };
  // vegan(invitados) devuelve 1
  // Tip: Podes usar el metodo for...in
  // Tu código aca:

  let contador = 0

  for (let invitado in invitados) {
    // console.log(invitado) => Luna, Sebas, Marce, Nicky
    //console.log(invitados[invitado]) //=> {vegan: false}, {vegan: false}, {vegan: false}, {vegan: true}
    //console.log(invitados[invitado].vegan) //=> false, false, false, true
    let esVegano = invitados[invitado].vegan
    if (esVegano) {
      contador++
    }
  }
  return contador
}

let invitados = {
  Luna: {
    vegan: true,
  },
  Sebas: {
    vegan: true,
  },
  Marce: {
    vegan: false,
  },
  Nicky: {
    vegan: true,
  },
}

console.log(vegan(invitados)) // 1

// No modifiques nada debajo de esta linea //

module.exports = vegan
