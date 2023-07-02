

function bienvenidoSr(persona) {
  // La funcion recibe un objeto "persona".
  // de la forma:
  // {
  //  nombre: 'Lionel
  //  apellido: 'Messi',
  //  invitado: true
  //  }
  // Si tiene la propiedad "invitado" y, además, tiene las propiedades "nombre" y "apellido", tomar esos valores y retorna:
  // "Lionel Messi, un gusto tenerlo nuevamente! Bienvenido".
  // Si tiene la propiedad "invitado" y solo tiene la propiedad "apellido", retornar:
  // "Bienvenido Sr. Messi".
  // Si tiene la propiedad "invitado" y solo tiene la propiedad "nombre", retornar:
  // "Hola Lionel, tu mesa está lista".
  // En caso de que no tenga la propiedad "invitado" retornar:
  // "Disculpe señor, no está invitado a la fiesta".
  //
  // Tu código:

  //si no tiene invitado, no esta invitado a la fiesta
  if (!persona.invitado) 
  return 'Disculpe señor, no está invitado a la fiesta' ;
  //no tiene apellido
  if (!persona.apellido) 
  return `Hola ${persona.nombre}, tu mesa está lista` ;
  //no tiene nombre
  if (!persona.nombre) 
  return `Bienvenido Sr. ${persona.apellido}` ;
  //que tiene nombre y apellido
  return `${persona.nombre} ${persona.apellido}, un gusto tenerlo nuevamente! Bienvenido`
}




const messi = {
  nombre: 'Lionel',
  apellido: 'Messi',
  invitado: true,
}
console.log(bienvenidoSr(messi))

