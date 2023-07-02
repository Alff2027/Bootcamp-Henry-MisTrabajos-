//Closures 
var creaFuncion = function () {
  var arreglo = [];

  for (var i = 0; i < 2; i++) {
    arreglo.push(
      function () {
        return console.log(i);
      }
    )
  }
  return arreglo;
}

var arr = creaFuncion();

arr[0]();


/////////////////////////
//IIFE
var creaFuncion = function () {
  var arreglo = [];

  for (var i = 0; i < 3; i++) {
    //IIFE
    arreglo.push(
      (function (j) {
        return function () {
          console.log(j);
        }
      }(i)))
  }
  return arreglo;
}

var arr = creaFuncion();

arr[2]();


//////////////////////////////////////////
function hacerSaludo(lenguaje) {
  if (lenguaje === 'en') {
    return function () {
      console.log('Hi!');
    }
  }

  if (lenguaje === 'es') {
    return function () {
      console.log('Hola!');
    }
  }
}

var saludoIngles = hacerSaludo('en');
var saludoEspañol = hacerSaludo('es');

saludoEspañol();

/////////////////////////////////////////

  //Memoization
function hagoAlgo(cb) {

  var cache = {};
  return function (valor) {
    if (cache.hasOwnProperty(valor)) {
      return cache[valor] + ' valor almacenado en cache';
    } else {
      return cache[valor] = cb(valor);
    }
  }

}

const cb = function multiplicar(x) {
  return x * x;
}

var hacerAlgo = hagoAlgo(cb);

console.log(hacerAlgo(10));
console.log(hacerAlgo(10));