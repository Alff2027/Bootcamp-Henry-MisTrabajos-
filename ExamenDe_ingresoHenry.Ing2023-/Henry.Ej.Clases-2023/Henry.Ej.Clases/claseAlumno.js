"use strict"

function crearClaseAlumno() {
  class Alumno {
    constructor(
      nombre = '',
      apellido = '',
      cohorte = 0,
      grupoDeAmigos = [{}],
      notasCheckpoints = [0]
    ) {
      // El constructor de la clase recibe nombre (string), apellido (string), cohorte (number),
      // grupoDeAmigos (array de objetos), notasCheckpoints (array de numbers).
      // Inicializar las propiedades del alumno con los valores recibidos como argumento.
      //
      // Tu codigo Aca:
      this.nombre = nombre
      this.apellido = apellido
      this.cohorte = cohorte
      this.grupoDeAmigos = grupoDeAmigos
      this.notasCheckpoints = notasCheckpoints
    }

    addAmigos(nombre, apellido) {
      // Este mÃ©todo debe agregar amigos al array de grupoDeAmigos del alumno.
      // AÃ±ade un objeto con las propiedades "nombre", "apellido" y "cohorte" (siendo
      // el value de cohorte el mismo que tiene asignado la instancia de "Alumno")
      // en el array de grupoDeAmigos.
      // No debe retornar nada.
      //
      // Tu cÃ³digo:
      this.grupoDeAmigos.push({
        nombre: nombre,
        apellido: apellido,
        cohorte: this.cohorte,
      })
    }

    obtenerAmigos() {
      // Este mÃ©todo debe devolver la cantidad de amigos que tiene el alumno.
      //
      // Tu cÃ³digo:
      return this.grupoDeAmigos.length
    }

    addNota(nota) {
      // Este mÃ©todo aÃ±ade una nota al array de notasCheckpoints
      // No debe retornar nada.
      //
      // Tu cÃ³digo:
      this.notasCheckpoints.push(nota)
    }

    obtenerNotas() {
      // Este mÃ©todo debe devolver un array con las notas del alumno.
      //
      // Tu cÃ³digo:
      return this.notasCheckpoints
    }

    presentacion() {
      // Este mÃ©todo debe devolver un string utilizando el nombre, el apellido y
      // el cohorte del alumno.
      // Ej: Si ejecutamos presentacion() en la instancia de alumno, devolverÃ­a:
      // "Hola, soy el alumno Lionel Messi del cohorte 13";
      //
      // Tu cÃ³digo:
      return "Hola, soy el alumno"+" "+ this.nombre +" "+ this.apellido +" "+ " del cohorte "+" "+ this.cohorte ;
    }
  }

  return Alumno
}

// Invocamos a la Funcion "crearClaseMascota":

const Alumno = crearClaseAlumno()

// Lista de Alumnos: 

const Alfredo = new Alumno(
  'Alfredo',
  'Encina',
  62,
  [{nombre: 'Sofia', apellido: 'pepona', cohorte:62}],[6,7,8]
)

// Probando las Funciones:

console.log(Alfredo);
Alfredo.addAmigos('Martina', 'Humofer');
console.log(Alfredo);
console.log(Alfredo.obtenerAmigos());
Alfredo.addNota(10);
console.log(Alfredo.obtenerNotas());
console.log(Alfredo.presentacion());
console.log(Alfredo);




