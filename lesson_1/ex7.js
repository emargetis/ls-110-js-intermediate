['ant', 'bear'].map(elem => {
  if (elem.length > 3) {
    return elem;
  }
});

/*
The return value from the code will be [undefined, 'bear']

When the callback function is executed with the argument 'ant', the function will
implicitly return `undefined`  because the explicit return is within an `if` block which will
not be executed when the condition is `false`. In the case of `ant` the condition will be 
`false`. However for the second element, the explicit return value will be executed.

*/