let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];

let newArr = arr.map(array => {
  if (typeof array[0] === 'string') {
    return array.slice().sort();
  } else {
    return array.slice().sort((a, b) => a - b);
  }
});

console.log(newArr);