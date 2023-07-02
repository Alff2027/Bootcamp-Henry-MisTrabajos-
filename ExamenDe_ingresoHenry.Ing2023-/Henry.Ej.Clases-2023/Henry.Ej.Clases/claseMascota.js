"use strict"

function crearClaseMascota() {
  class Mascota {
    constructor(nombre, dueño = { nombre: '', apellido: '' }, actividades) {
      // El constructor de la clase Mascota recibe nombre (string), dueño (objeto), actividades (array de objetos)
      // ej:
      //[{actividad: 'salir a caminar', frecuencia: '1 vez al dia'}, {actividad: 'baño', frecuencia: '1 vez al mes'}]
      // Inicializar las propiedades de la mascota con los valores recibidos como argumento
      // Tu código aca:
      this.nombre = nombre
      this.dueño = dueño
      this.actividades = actividades
    }

    getNombre() {
      // este método debe retornar el nombre de la mascota.
      // Tu código aca:
      return this.nombre
    }

    getDueño() {
      // El método debe retornar nombre y apellido del dueño (concatenados).
      // Tu código aca:
      return this.dueño.nombre + ' ' + this.dueño.apellido
    }

    addActividad(actividad, frecuencia) {
      // El método recibe un string 'actividad' y otro string 'frecuencia'  y debe agregarlo al arreglo de actividades de la mascota.
      // No debe retornar nada.
      // Tu código aca:
      this.actividades.push({ actividad, frecuencia })
    }

    getActividades() {
      // El método debe retornar un arreglo con sólo las actividades de las mascotas.
      // Ej:
      // [{actividad: 'salir a caminar', frecuencia: '1 vez al dia'}, {actividad: 'baño', frecuencia: '1 vez al mes'}]
      // mascotas.getActividades() debería devolver ['salir a caminar, 'baño']
      // Tu código aca:
      return this.actividades.map((actividad) => actividad.actividad)
    }

    getFrecuencia(actividades) {
      // El metodo debe retornar la frecuencia de dicha actividad
      // ej:
      // [{actividad: 'salir a caminar', frecuencia: '1 vez al dia'}, {actividad: 'baño', frecuencia: '1 vez al mes'}]
      // mascotas.getFrecuencia('baño') debería devolver '1 vez al mes'
      // Tu código aca:}
      //   for (let act of this.actividades) {
      //     if (act.actividad === a) {
      //       return act.frecuencia
      //     }
      //   }
      return this.actividades.find((act) => act.actividad === actividades).frecuencia
    }
  }
  return Mascota
}


// Invocamos a la Funcion "crearClaseMascota":

const Mascota = crearClaseMascota()

// Lista de mascotas: 

const Kin = new Mascota(
  'Kin',
  { nombre: 'Abigail', apellido: 'Encina' },
  [
    { actividad: 'salir a caminar', frecuencia: '8 vez al dia' },
    { actividad: 'baño', frecuencia: '1 vez a la semana' },
    { actividad: 'comer', frecuencia: 'cada 4 horas'  }
  ]
)



const Tony = new Mascota(
  'Tony',
  { nombre: 'Nicky', apellido: 'Medina' },
  [
    { actividad: 'salir a caminar', frecuencia: '1 vez al dia' },
    { actividad: 'baño', frecuencia: '1 vez al mes' },
  ]
)



//FUNCIONES: 
// PERRO Tony:
console.log(Tony.getActividades());
console.log(Tony.getFrecuencia('baño'));
console.log(Tony.getDueño());
console.log(Tony.getNombre());
Tony.addActividad('Ladrar','cada rato');
console.log(Tony.getActividades());
// GATO Kin:
console.log(Kin.getActividades());
console.log(Kin.getFrecuencia('baño'));
console.log(Kin.getDueño());
console.log(Kin.getNombre());
Kin.addActividad('rajuñar','a cada rato');
console.log(Kin.getActividades());


