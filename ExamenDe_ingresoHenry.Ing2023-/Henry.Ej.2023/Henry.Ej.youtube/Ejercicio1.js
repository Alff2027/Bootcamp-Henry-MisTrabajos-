function mayorMenor(numeros){
/*let mayor= -Infinity;
let menor= Infinity; 


for(let i=0;i<numeros.length;i++){
let valorActual=numeros[i];
if (valorActual>mayor){
    mayor=valorActual
}
if(valorActual<menor){
    menor=valorActual
}

}

return [menor,mayor];
//otra forma: */

return [Math.max(...numeros), Math.min(...numeros)];

};

console.log(mayorMenor([9,17,6,2,4]))
