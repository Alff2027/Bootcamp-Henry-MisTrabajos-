function agregarPropiedad(amigos, propiedad) {
 /*for (let amigo of amigos) {
    if (!amigo[propiedad]) amigo[propiedad]=null
 }

 return amigos*/

 return amigos.map((amigo) => !amigo[propiedad] ? { ...amigo, [propiedad]: null} : amigo );

};


var amigos= [{nombre:'toni'},{nombre:'Emi',edad:25}];

console.log(agregarPropiedad(amigos, 'edad'));

/*OTRA FORMA CON "map":
function agregarPropiedad(amigos, propiedad) {
    return amigos.map((amigo) => !amigo[propiedad] ? { ...amigo, [propiedad]: null} : amigo );
}
*/

