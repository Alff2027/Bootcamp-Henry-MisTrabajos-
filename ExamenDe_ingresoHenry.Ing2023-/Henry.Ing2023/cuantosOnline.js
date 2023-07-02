/* 
  Importante: 
  No modificar ni el nombre ni los argumetos que reciben las funciones, sÃ³lo deben escribir
  cÃ³digo dentro de las funciones ya definidas. 
  No comentar la funcion 
*/
function cuantosOnline(usuarios) {
  // La funcion llamada "cuantosOnline" recibe como argumento un objeto 'usuarios', cada property de ese objeto es un objeto
  // cada usuario tiene una property 'online' que es un booleano.
  // deberia devolver la cantidad de usuarios con la property online igual a true.
  // Por ej:
  // let usuarios = {
  //     toni: {
  //         edad: 33,
  //         online: true
  //     },
  //     emi: {
  //         edad: 25,
  //         online: true
  //     },
  //     fran: {
  //         edad: 25,
  //         online: false
  //     },
  //     agus: {
  //         edad: 24,
  //         online: false
  //     }
  // };
  // cuantosOnline(usuarios) devuelve 2
  // Tip: Podes usar el metodo for...in
  // Tu cÃ³digo aca:
  let usuariosOnline = 0
  for (let usuario in usuarios) {
    if (usuarios[usuario].online) usuariosOnline++
  }
  return usuariosOnline
}

let usuarios = {
  toni: {
    edad: 33,
    online: true,
  },
  emi: {
    edad: 25,
    online: true,
  },
  fran: {
    edad: 25,
    online: false,
  },
  agus: {
    edad: 24,
    online: false,
  },
}
console.log(cuantosOnline(usuarios))
// No modifiques nada debajo de esta linea //

module.exports = cuantosOnline
