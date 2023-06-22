let arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];

let filtered = arr.filter(obj => {
  for (let key in obj) {
    if (obj[key].every(num => num % 2 === 0) === false) {
      return false;
    }
  }
  
  return true;
});

console.log(filtered);