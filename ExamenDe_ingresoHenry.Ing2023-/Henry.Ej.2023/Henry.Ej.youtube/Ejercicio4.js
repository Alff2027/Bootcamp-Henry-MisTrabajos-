function sumArray(array,n){

    let sumas=[];
    for (let i=0; i< array.length; i++) {
        for(let j=0; j<array.length; j++) {
            if (i !== j) sumas.push(array[i]+array[j])
        }
    }
    return sumas.includes(n);

}

console.log(sumArray([2,5,7,10,11,15,20],9))

