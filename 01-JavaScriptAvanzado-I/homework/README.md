
# Ejercicios

## JavaScript

### Scope & Hoisting

Determiná que será impreso en la consola, sin ejecutar el código.

> Investiguen cual es la diferencia entre declarar una variable con `var` y directamente asignarle un valor.

```javascript
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
/*Output 
 10
 8
 8
 9
 10
 1
*/

// end
```

```javascript
console.log(bar);
console.log(baz);
foo();
function foo() { console.log('Hola!'); }
var bar = 1;
baz = 2;

/*Output
 Reference Error baz is not defined
*/
```

```javascript
var instructor = "Tony";
if(true) {
    var instructor = "Franco";
}
console.log(instructor);

/*Output
 Franco
*/
```

```javascript
var instructor = "Tony";
console.log(instructor);
(function() {
   if(true) {
      var instructor = "Franco";
      console.log(instructor);
   }
})();
console.log(instructor);

/*Output
 Tony
 Franco
 Tony
*/
```

```javascript
var instructor = "Tony";
let pm = "Franco";
if (true) {
    var instructor = "The Flash";
    let pm = "Reverse Flash";
    console.log(instructor);// The Flash
    console.log(pm);// Reverse Flash
}
console.log(instructor); //The Flash
console.log(pm);//Franco

/*Output
 The Flash
 Reverse Flash
 The Flash
 Franco
*/

```
### Coerción de Datos

Que crees que va dar estas operaciones:

```javascript
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
7 / 0 = ∞
{}[0] = undefined
parseInt("09") = 9
5 && 2 = true 2
2 && 5 = true 5 
5 || 0 = true 5
0 || 5 = true 5
[3]+[3]-[10] = 23
3>2>1 = false
[] == ![] = true
```

> Si te quedó alguna duda repasá con [este artículo](http://javascript.info/tutorial/object-conversion).


### Hoisting

Cuál es el output que vemos en consola luego de ejecutar esté código? Explicar porqué es así:

```javascript
function test() {
   console.log(a);
   console.log(foo());

   var a = 1;
   function foo() {
      return 2;
   }
}

test();

/*Output
   undefined
   2
*/

/*
Por que por el Hoisting las variables y funciones se acomodan al principio de su ámbito respectivo:

   var a;
   function foo() {
      return 2;
   }

   console.log(a);
   console.log(foo());
   a = 1;
   
*/
```

Y el de este:

```javascript
var snack = 'Meow Mix';

function getFood(food) {
    if (food) {
        var snack = 'Friskies';
        return snack;
    }
    return snack;
}

getFood(false);

/*Output
   nada
*/

/*
Por que al no ejecutar el console.log no se muestra nada en la consola
   
*/

```


### This

Cuál es el output que vemos en consola luego de ejecutar esté código? Explicar porqué es así:

```javascript
var fullname = 'Juan Perez';
var obj = {
   fullname: 'Natalia Nerea',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname; // Aurelio De Rosa
      }
   }
};

console.log(obj.prop.getFullname()); // Aurelio de Rosa

var test = obj.prop.getFullname();

console.log(test()); // undefined

/*Output
   Aurelio de Rosa
   undefined
*/
```

### Event loop

Considerando el siguiente código, cuál sería el orden del ouput? Por qué?

```javascript
function printing() {
   console.log(1);//1
   setTimeout(function() { console.log(2); }, 1000);//2
   setTimeout(function() { console.log(3); }, 0);//3
   console.log(4);
}

printing();

/*
Output
   1
   4
   3
   2
*/

/*Se ejecutan los console.log primero por que se encuentran en el scope global y por ende en el stack de funciones despues de las funciones del scope global se suman en el stack y ejecutan los setTimeout por que se encuentran en el webapi.
primero 1 y 4 por los console.log
luego 3 por que el timeout es 0 segundos .
Al final el 2 por que el time era de 1 segundo.
*/
```