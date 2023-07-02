function ult(txt) {
      return txt.slice(-1)
}

//console.log(ult('CONCHAAAA'))

function ultpal(str){
    let Arr= str.split(" ");
    return ((Arr[1]))
}
 
//console.log(ultpal('HOLA, ME LLAMO ALF'))

function facil(str){
    return str
}

//console.log(facil('Alfredo'))


function juntar(str){
    let Arr=str.split(" ")
    let revs1=[Arr.slice((Arr.length-2),(Arr.length-1))];
    let letras=revs1.reverse().join("")
    return letras
}

console.log(juntar(" hola soy alf"))


//console.log(juntar("hola bebe"))

function returnAdd(num1, num2) {

    return num1 + num2
  }

  //console.log(returnAdd(3,4))

