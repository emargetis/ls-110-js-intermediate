let arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];

// expected value of object
// { a: 1, b: 'two', sea: { c: 3 }, D: [ 'a', 'b', 'c' ] }

let obj = {};

arr.forEach(subArray => {
  obj[subArray[0]] = subArray[1];
});

console.log(obj);

//alternative solution
//Object.fromEntries(arr);