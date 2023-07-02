function crearClaseViajero() {

  class Viajero {

    constructor(nombre= '', edad=0, paises=[''], compañeros=[{}]) {

        this.nombre=nombre
        this.edad=edad
        this.paises=paises
        this.compañeros=compañeros
    }


    addCompañero(nombre= '', nacionalidad='', edad=0) {
     this.compañeros.push({nombre:nombre,nacionalidad:nacionalidad,edad:edad});

    }
    
    addPais(pais='') {
        this.paises.push(pais)
    }
    
    getCompañeros() {
        const newArr=[]
        for (let comp of this.compañeros) {
            newArr.push(comp.nombre)
        }
        return newArr 

    }

    getPaises() {
        return this.paises
    }
    
    getPromedioEdad() {
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






