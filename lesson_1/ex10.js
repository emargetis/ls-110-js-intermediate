let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

//Way 1
let min = Infinity;

Object.values(ages).forEach(element => {
  if (element < min) {
    min = element;
  }
})

console.log(min);

//Way 2
console.log(Math.min(...Object.values(ages)));

//Way 3
console.log(Object.values(ages).sort().shift());