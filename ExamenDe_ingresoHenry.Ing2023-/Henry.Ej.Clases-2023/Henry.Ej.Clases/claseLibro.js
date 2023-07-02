/* Importante: 
  No modificar ni el nombre ni los argumetos que reciben las funciones, sólo deben escribir
  código dentro de las funciones ya definidas. 
  No comentar la funcion */

function crearClaseLibro() {
  class Libro {
    constructor(titulo, autor, traducciones) {
      // El constructor de la clase Libro recibe titulo (string), autor (string), traducciones (array de objetos)
      // Inicializar las propiedades del libro con los valores recibidos como argumento
      // Tu código aca:
      this.titulo = titulo
      this.autor = autor
      this.traducciones = traducciones
    }
    getTitulo() {
      // este método debe retornar el titulo del libro.
      // Tu código aca:
      return this.titulo
    }
    getAutor() {
      // El método debe retornar nombre y apellido del autor
      // Tu código aca:
      return this.autor //"carlos sanchez"
    }
    addTraduccion(idiomas, editorial) {
      // El método recibe un string 'idioma' y un string 'editorial' y debe agregar un objeto:
      // { idioma: idioma, editorial: editorial} al arreglo de traducciones del libro.
      // No debe retornar nada.
      // Tu código aca:
      let objeto = {
        idioma: idiomas,
        editorial: editorial,
      }
      this.traducciones.push(objeto)
    }
    getTraducciones() {
      // El método debe retornar un arreglo con sólo los idiomas del arreglo de traducciones del libro.
      // Ej:
      // Suponiendo que el libro tiene estas traducciones: [{idioma: 'inglés', editorial: 'Scholastic'}, {idioma: 'castellano', editorial: 'Santillana'}]
      // libro.getTraducciones() debería devolver ['inglés', 'castellano']
      // Tu código aca:
      let idiomas = []
      for (let i = 0; i < this.traducciones.length; i++) {
        idiomas.push(this.traducciones[i].idioma)
      }

      return idiomas
    }
    getAlcance() {
      // El metodo debe retornar la cantidad de idiomas en la que esta traducido el libro.
      // Dato: no se repiten ni los idiomas ni las editoriales
      // ej:
      // Suponiendo que el libro tiene estas traducciones: [{idioma: 'inglés', editorial: 'Scholastic'}, {idioma: 'castellano', editorial: 'Santillana'}]
      // libro.getAlcance() deberia devolver 2
      // Tu código aca:
      return this.traducciones.length
    }
  }
  return Libro
}

const Libro = crearClaseLibro()

const newLibro = new Libro('elon musk', 'periodista', [
  { idioma: 'ingles', editorial: 'planeta' },
])

console.log(newLibro)
console.log(newLibro.getTitulo())
console.log(newLibro.getAutor())
console.log(newLibro.addTraduccion('aleman', 'schacsdc'))
console.log(newLibro)
console.log(newLibro.getTraducciones())
console.log(newLibro.getAlcance())

// No modifiques nada debajo de esta linea //

module.exports = crearClaseLibro
