let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];

console.log(arr.map(subarray => {
  return subarray.filter(number => number % 3 === 0);
}));

console.log(arr);