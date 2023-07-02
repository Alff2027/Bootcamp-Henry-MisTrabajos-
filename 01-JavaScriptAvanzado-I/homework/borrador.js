//Start EJ 1
x = 1;
var a = 5;
var b = 10;
var c = function(a, b, c) {
  var x = 10;
  console.log(x);
  console.log(a);
  var f = function(a, b, c) {
    b = a;
    console.log(b);
    b = c;
    var x = 5;
  }
  f(a,b,c);
  console.log(b);
}
c(8,9,10);
console.log(b);
console.log(x);

/////////////////////////////////////////////////////////

var x;
var a;
var b;

var c = function(a, b, c) {
  var x;
  
  x = 10;
  console.log(x); // 10
  console.log(a); //8

  var f = function(a, b, c) {
    var x;
    b = a;
    console.log(b); //8
    b = c;
    x = 5;
  }
  
  f(a,b,c);
  console.log(b); //9
}

c(8,9,10);

x = 1;
a = 5;
b = 10;

console.log(b); //10
console.log(x); //1

 //EJ 1.1
 console.log(bar);
 console.log(baz);
 foo();
 function foo() { console.log('Hola!'); }
 var bar = 1;
 baz = 2;

 /////////////////////////////
 var bar;
 var baz;

 function foo() { console.log('Hola!'); }
 foo(); // 'Hola!'

 bar = 1;
 baz = 2;

 console.log(bar);//1
 console.log(baz);//2
//End EJ 1




var creaFuncion = function() {
  var arreglo =[];
  
  for(var i = 0; i <3; i++){
    arreglo.push(
      function () {
        console.log(i);
      }
    )
  }
  return arreglo;
}

arreglo = [function() {console.log}]