"use strict"

function crearClaseViajero() {
  class Viajero {
    constructor(nombre, edad, paises, compañeros) {
      // El constructor de la clase Viajero recibe nombre (string), edad (integer), paises (array de strings), compañeros (array de objetos)
      // Inicializar las propiedades del viajero con los valores recibidos como argumento

      // Tu código aca:
      this.nombre = nombre
      this.edad = edad
      this.paises = paises
      this.compañeros = compañeros
    }

    addCompañero(nombre, nacionalidad, edad) {
      // El método 'addCompañero' recibe un string 'nombre', un string 'nacionalidad' y un entero 'edad' y
      // debe agregar un objeto:
      // { nombre: nombre, nacionalidad: nacionalidad, edad: edad} al arreglo de compañeros del viajero.
      // No debe retornar nada.

      // Tu código aca:
      this.compañeros.push({
        nombre: nombre,
        nacionalidad: nacionalidad,
        edad: edad,
      })
    }

    addPais(pais) {
      // El método 'AddPais' recibe un string 'pais' y debe agregarlo al arreglo de paises del viajero.
      // No debe retornar nada.

      // Tu código aca:
      this.paises.push(pais)
    }

    getCompañeros() {
      // El método 'getCompañeros' debe retornar un arreglo con sólo los nombres del arreglo de compañeros
      // del viajero.
      // Ej:
      // Suponiendo que el viajero tiene estos compañeros: [{nombre: 'John', nacionalidad: "Australiano", edad: 27},{nombre: 'Peter', nacionalidad: "Belga", edad: 23}]
      // viajero.getCompañeros() debería devolver ['John', 'Peter']

      // Tu código aca:
      const newArr=[]
        for (let comp of this.compañeros) {
            newArr.push(comp.nombre)
        }
        return newArr 
    }

    getPaises() {
      // El método 'getPaises' debe retornar un arreglo con los paises del viajero
      // Ej:
      // viajero.getPaises() debe devolver ['Belgica', 'Estados Unidos', 'Islandia']

      // Tu código aca:
      return this.paises
    }

    getPromedioEdad() {
      // El método 'getPromedioEdad' debe retornar el promedio de edad de los compañeros de un viajero.
      // Ej:
      // Si el viajero tuviera estos compañeros:
      // {
      //   compañeros: [{
      //     nombre: 'John',
      //     nacionalidad: "Australiano",
      //     edad: 27,
      //   }, {
      //     nombre: 'Peter',
      //     nacionalidad: "Belga",
      //     edad: 23
      //   }]
      // }
      // viajero.getPromedioEdad() debería devolver 25 ya que (27 + 23) / 2 = 25

      // Tu código aca:
      let sumaEdades=0 
      for (let comp of this.compañeros) {
       sumaEdades += comp.edad
      }
      return sumaEdades/this.compañeros.length
    } 
      
  }

  return Viajero
}


const Viajero = crearClaseViajero()

const Alfredo = new Viajero(
  'Alfredo', 37,['Argentina', 'Paraguay','Brasil','Chile'],[{nombre:'Estefy',nacionalidad:'Chile',edad:22}]

)

//PRUEBA PILOTO CON ALFREDO:

console.log(Alfredo)

Alfredo.addCompañero('Sofia','Chile', 18)
Alfredo.addPais('EEUU')
console.log(Alfredo.compañeros)
console.log(Alfredo.getCompañeros())
console.log(Alfredo.getPaises())
console.log(Alfredo.getPromedioEdad())




