function mapear() {
  // Escribi una funcion mapear en el prototipo del objeto global 'Array'
  // que recibe una funcion callback , que se ejecuta por cada elemento del array
  // mapear los elementos de ese array segun la funcion callback
  // Esta funcion tiene que devolver un array nuevo con los elementos mapeados.
  // NO USAR LA FUNCION MAP DE ARRAYS.
  // ej:
  // var numeros = [1, 2, 3, 4];
  // numeros.mapear(function(numero) {
  //   return numero + 1;
  // }) devuelve [2, 3, 4, 5]
  // Tu código aca:
  const ederMap = function (cb) {
    let arr = []
    for (let i = 0; i < this.length; i++) {
      arr.push(cb(this[i], i))
    }
    return arr
  }
  Array.prototype.mapear = ederMap
}
