let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];


arr.sort((a,b) => {
  let aOddSum = a.filter(num => num % 2 === 1).reduce((accum, num) => accum += num, 0);
  let bOddSum = b.filter(num => num % 2 === 1).reduce((accum, num) => accum += num, 0);
  
  return aOddSum - bOddSum;
})

console.log(arr);