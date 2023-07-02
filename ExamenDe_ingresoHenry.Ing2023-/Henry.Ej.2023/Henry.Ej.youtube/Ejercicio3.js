function sumaTodosPrimos(array){
   
/*let acumulador=0;
for(let i=0; i<array.length;i++){
    let valorActual= array[i]
    if (esPrimo(valorActual)) acumulador+=valorActual
}
  //return acumulador*/

// otra forma:
return array.reduce((a,c) => (esPrimo(c) ? a+c : a),0)

 
};


function esPrimo(numero){
    if (numero<2) return false
    for(let i=2; i<= numero **0.5;i++){
       if(numero % i === 0) return false 
    }
    return true
}

console.log(sumaTodosPrimos([1,5,2,9,3,4,11]));






