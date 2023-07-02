const { Queue } = require("../DS");
// ⚠️ NO MODIFICAR NADA POR ENCIMA DE ESTA LÍNEA ⚠️

// 1️⃣ ***** EJERCICIO 1 ***** - henryParty() 1️⃣
// Tenemos complicaciones! 
// Se esta organizando una fiesta para inagurar las nuevas 
// casas pero hay gente desconocida que intenta ingresar
// La función recibirá por parámetro un array que representa
// en orden la fila de personas que intentan ingresar
// necesitamos que solo ingresen los que tienen los 
// ticket:"VIP" y que sean conocidos!
// ingresa las personas validas a una nueva QUEUE, 
//donde iremos filtrando los invitados para que solo
// queden los invitados correctos.
//
// El array de movimientos tendrá la siguiente forma:
//
// [{name:"Carol", ticket:"FALSO", estado: "Desconocido"},
// {name:"Gonzalo", ticket:"VIP",estado: "Conocido"},
// {Name: "Micaias", ticket:"VIP", estado: "Desconocido"}], 
// donde ticket y estado, representan el ingreso 
// de una persona al nuevo QUEUE.
// Finalmente, la función debe retornar la QUEUE que 
// representa los invitados validos para ingresar.
//
// EJEMPLOS:
//
// - henryParty([{name:"Carol", ticket:"FALSO", estado: "Desconocido"},⚠️
// {name:"Gonzalo", ticket:"VIP", estado: "Conocido"}, 🟢
// {Name: "Micaias", ticket:"VIP", estado: "Desconocido"}] ⚠️
// ) 
// => Queue [name:"Gonzalo", ticket:"VIP",estado: "Conocido"}]

// REQUISITOS:
//  🟢 La función debe retornar la QUEUE resultante
// de procesar los movimientos.
//  🟢 Si la función intenta retirar a una persona cuando
// la Queue se encuentra vacía,
//    debe retornar false
//  🟢 La QUEUE que retorna la función debe ser una
//  instancia de la clase QUEUE.

function henryParty(arr) {
  // Tu código aquí:
  let newQueue = new Queue();

  for (let i = 0; i < arr.length; i++) {
    let guests = arr[i];
    if (guests.ticket === "VIP" && guests.estado === "Conocido") newQueue.enqueue(guests);
  }

  if (newQueue.size() === 0) return false;

  return newQueue;

}

// ⚠️ NO MODIFICAR NADA POR DEBAJO DE ESTA LÍNEA ⚠️
module.exports = {
  henryParty
};