function cuantosMenores(invitados) {
  let contador = 0
  for (let invitado in invitados) {
    let edadInvitado = invitados[invitado].edad
    if (edadInvitado < 18) {
      //   console.log('un menor!!!')
      contador++
    }
  }
  return contador
}

let invitados = {
  Luna: {
    edad: 24,
  },
  Sebas: {
    edad: 7,
  },
  Marce: {
    edad: 34,
  },
  Nicky: {
    edad: 15,
  },
}

console.log(cuantosMenores(invitados)) // 0
