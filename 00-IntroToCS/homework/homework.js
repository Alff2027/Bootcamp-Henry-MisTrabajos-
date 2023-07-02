function BinarioADecimal(num) {
  // tu codigo aca
  let array = num.split('').reverse().map(Number);
  let x = 0;
  let result = 0;
  for (i = 0; i < array.length; i++) {
    x = array[i] * Math.pow(2, i);
    result = result + x;
  }

  return result;
}

function DecimalABinario(num) {
  // tu codigo aca
  var binary = "";
  var temp = num;
 
    while(temp > 0){
        if(temp % 2 === 0){
            binary = "0" + binary;
        }
        else {
            binary = "1" + binary;
        }

        temp = Math.floor(temp / 2);
    }
    
    return binary;
}


module.exports = {
  BinarioADecimal,
  DecimalABinario,
}