function mismaCantidadCaracteres(strings, caracteres){

return strings.filter((e) => e.length == caracteres)

};

console.log(mismaCantidadCaracteres(['hi','hello','ni hao','guten tag'],2));

