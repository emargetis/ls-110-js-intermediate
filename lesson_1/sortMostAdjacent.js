function sortStringsByConsonants (inputArray) {
  let arrayCount = [];
  let outputArray = [];
  
  //create nested array of string and consonant count
  for (let i = 0; i < inputArray.length; i += 1) {
    arrayCount.push(determineConsonants(inputArray[i]));
  }
  
  //sort array
  arrayCount.sort((a,b) => b[1] - a[1]);
  
  // return string values only array
  outputArray = arrayCount.flat().filter(element => typeof element === 'string');
  
  return outputArray;
}


function determineConsonants(inputString) {
  let maxConsonants = 0;
  
  for (let i = 0; i < inputString.length; i += 1) {
    let consonantCount = 0;
    
    for (let x = i; x < inputString.length; x += 1) {
      if (inputString[x] === ' ') continue; //check if character is equal to a blank space and skip if so
      
      if (isConsonant(inputString[x])) {
        consonantCount += 1;
        if (consonantCount > maxConsonants) {
          maxConsonants = consonantCount;
        }
      } else {
        break;
      }
    }
  }
  return [inputString, maxConsonants];
}

function isConsonant(letter) {
  return !['a', 'e', 'i', 'o', 'u', 'y'].includes(letter);
}


console.log(sortStringsByConsonants(['aa', 'baa', 'ccaa', 'dddaa'])); // ['dddaa', 'ccaa', 'aa', 'baa']
console.log(sortStringsByConsonants(['can can', 'toucan', 'batman', 'salt pan'])); // ['salt pan', 'can can', 'batman', 'toucan']
console.log(sortStringsByConsonants(['bar', 'car', 'far', 'jar'])); // ['bar', 'car', 'far', 'jar']
console.log(sortStringsByConsonants(['day', 'week', 'month', 'year'])); // ['month', 'day', 'week', 'year']


// console.log(determineConsonants('dddaa'));
// console.log(determineConsonants('ccaa'));
// console.log(determineConsonants('baa'));
// console.log(determineConsonants('salt pan'));

// console.log(isConsonant('a'));