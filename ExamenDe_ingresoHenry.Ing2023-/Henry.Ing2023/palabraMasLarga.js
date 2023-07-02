"use strict"

function palabraMasLarga(frases) {
  // La funcion llamada 'palabraMasLarga' recibe un array 'array' de frases (strings) como parametro
  // y debe devolver la palabra mas larga entre todas las frases ( Es decir la palabra con mayor cantidad de caracteres)
  // Por ej:
  // palabraMasLarga(['hola esto string', 'frase con palabra']) debe devolver 'palabra'

  // Tu código aca:
  //convertir el array de frases en un array de strings
  if (frases.length === 0) {
    return 'el arreglo esta vacio'
  }

  const newArr = []

  for (let frase of frases) {
    let fraseSpliteada = frase.split(' ')
    for (let palabra of fraseSpliteada) {
      newArr.push(palabra)
    }
  }

  let indice = 0

  for (let i = 0; i < newArr.length; i++) {
    if (newArr[i].length > newArr[indice].length) {
      indice = i
    }
  }
  return newArr[indice]
}

console.log(palabraMasLarga(['hola esto string', 'frase con palabra']));


