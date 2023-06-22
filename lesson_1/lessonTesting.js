function multiply(numbers, multiplier) {
  let multiplied = [];

  for (let counter = 0; counter < numbers.length; counter += 1) {
    let currentNumber = numbers[counter];
    
    multiplied.push(numbers[counter] * multiplier);
  }

  return multiplied;
}

let myNumbers = [1, 4, 3, 7, 2, 6];
console.log(multiply(myNumbers, 3)); // => [3, 12, 9, 21, 6, 18]