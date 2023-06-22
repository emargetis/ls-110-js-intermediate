let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];

let newArr = arr.map(array => {
  if (typeof array[0] === 'string') {
    return array.slice().sort().reverse();
  } else {
    return array.slice().sort((a, b) => b - a);
  }
});

console.log(newArr);

//Launch School Solution
// arr.map(subArr => {
//   return subArr.slice().sort((a, b) => {
//     if (typeof a === 'number') {
//       return b - a;
//     }

//     if (a < b) {
//       return 1
//     } else if (a > b) {
//       return -1;
//     } else {
//       return 0;
//     }
//   });
// });

// // => [ [ 'c', 'b', 'a' ], [ 11, 2, -3 ], [ 'green', 'blue', 'black' ] ]