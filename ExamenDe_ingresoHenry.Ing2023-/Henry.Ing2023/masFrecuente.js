function masFrecuente(array) {
  // La funcion llamada 'masFrecuente' recibe como argumento un array de numeros enteros
  // y debe devolver el número entero que mas veces aparece (el más frecuente).
  // ej:
  // masFrecuente([1,1,2,3,4]) => 1
  // masFrecuente([3,2,3,2,3,3]) => 3
  // Nota: Los numeros pueden NO estar ordenados
  // Tu código aca:
  const obj = {}

  //cuenta cuantas veces se repite
  array.map((e) => (obj[e] = (obj[e] || 0) + 1))

  let keymayor = null
  let valuemayor = 0

  for (let prop in obj) {
    if (obj[prop] > valuemayor) {
      valuemayor = obj[prop]
      keymayor = prop
    }
  }
  return +keymayor
}

// console.log(masFrecuente([1, 1, 2, 3, 4]))
console.log(masFrecuente([3, 2, 3, 2, 3, 3]))
