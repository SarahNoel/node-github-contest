// Write a function `secondGreatLow` that takes a single array of numbers and returns the second lowest and second greatest numbers, respectively, separated by a space. For example: if the array contains [7, 7, 12, 98, 106] the output should be "12 98". The array will not be empty and will contain at least 2 numbers. It can get tricky if there's just two numbers!

function secondGreatLow(array){
  if (array.length === 2){
    if(array[0] < array[1]){
      return array[1].toString() + " " + array[0].toString()
    }else{
      return array[0].toString() + " " + array[1].toString()
    }
  }else{
    array.sort(function(a, b){return a-b});
    var out = [];
    var length = array.length - 1;
    if (length >= 0) {
      for (var i = 0; i < length; i++) {
        if (array[i] !== array[i+1]) {
            out.push(array[i]);
        }
      }
    }
    out.push (array[length]);
    var index = out.length - 2;
    return out[1]+ " " + out[index]
  }
}


function timeConvert(number){
    var hours = parseInt(number/60);
    var minutes = number % 60
    return hours + ":" + minutes;
}



// Write a function `timeConvert` that takes a number parameter and returns the number of hours and minutes the parameter converts to (ie. if num = 63 then the output should be 1:3). Separate the number of hours and minutes with a colon.
