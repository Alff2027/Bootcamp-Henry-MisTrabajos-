// No cambies los nombres de las funciones.

function factorear(num) {
  // Factorear el número recibido como parámetro y devolver en un array
  // los factores por los cuales se va dividiendo a dicho número (De menor a mayor)
  // Ej: factorear(180) --> [2, 2, 3, 3, 5] Ya que 2x2x3x3x5 = 180 y son todos números primos
  // Tu código:
  var arr = [];
  if (num / 1 === 1) arr.push(1);
  for (var i = 1; num > 1; i++) {
    if (i !== 1 && num % i === 0) {
      num = num / i;
      arr.push(i);
      i--;
    }
  }

  return arr;
}

function bubbleSort(array) {
  // Implementar el método conocido como bubbleSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:
  for (let i = 0; i < 2; i++) {
    for (let i = 0; i < array.length; i++) {

      if (array[i] > array[i + 1]) {
        let j;
        j = array[i];
        array[i] = array[i + 1];
        array[i + 1] = j;
      }
    }
  }
  return array;

}


function insertionSort(array) {
  // Implementar el método conocido como insertionSort para ordenar de menor a mayor
  // el array recibido como parámetro utilizando arreglos
  // Devolver el array ordenado resultante
  // Tu código:
  for (let i = 1; i < array.length; i++) {
    let j = i - 1;
    let temp = array[i];

    while (j >= 0 && array[j] > temp) {
      array[j + 1] = array[j];
      j--;
    }
    array[j+1] = temp;
  }
  return array;

}


function selectionSort(array) {
  // Implementar el método conocido como selectionSort para ordenar de menor a mayor
  // el array recibido como parámetro utilizando dos arreglos
  // Devolver el array ordenado resultante
  // Tu código:
  for (var i = 0; i < array.length; i++) {
    // Choosing the first element in our unsorted subarray
    let current = array[i];
    // The last element of our sorted subarray
    let j = i - 1;
    while ((j > -1) && (current < array[j])) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = current;
  }
  return array;
}


// No modificar nada debajo de esta línea
// --------------------------------

module.exports = {
  factorear,
  bubbleSort,
  insertionSort,
  selectionSort,
};