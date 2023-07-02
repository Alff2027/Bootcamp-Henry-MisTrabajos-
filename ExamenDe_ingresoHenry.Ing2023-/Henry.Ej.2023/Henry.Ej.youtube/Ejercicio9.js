function filtrar(funcion) {
Array.prototype.filtrar= function(callback) {
    const newArr=[]
    for (let elemento of this) {
        if(callback(elemento))newArr.push(elemento)
    }
    return newArr
}

}


filtrar()


// PRODUCTOS: 

var productos = [
 {
   price:100,
   name:'tv',
 },

 {
    price:50,
    name:'phone',
 },

 {
    price:30,
    name:'lamp',
 }

]