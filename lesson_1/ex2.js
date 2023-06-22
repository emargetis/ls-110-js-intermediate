[1, 2, 3].map(num => {
  num * num;
});

/*

The return value is a new array `[undefined, undefined, undefined]` becuase the callback function
passed as an argument to `.map` squares each number and but it does not return a value given that 
it is not correct syntax for a single line expression, nor does it have an explicit return. The `.map` 
method returns a new array containing the return value of passing each element in as a parameter to the
the callback function, which in this case returns `undefined`.

*/