[1, 2, 3].map(num => num * num);

/* 

The return value for this code is  a new array of `[1, 4, 9]`, which is an array containing squares for each value.

The reason that this code returns an array of squares is because we are calling the `.map` function on
the array `[1, 2, 3]` and passing in a callback function which is a one-line function that has an 
implicit return value of the result of num * num.

*/