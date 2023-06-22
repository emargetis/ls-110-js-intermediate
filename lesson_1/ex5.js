[1, 2, 3].every(num => {
  return num = num * 2;
});

/*
The return value for this code will be `true`

The reason `.every` returns `true` is because each time the callback function
returns a value, the return value will be a positive number that is truthy and 
will evaluate to true. Therefore, all elements will evaluate to true and the
`.every` function will return `true`

Failed to answer the first part of the question: 2, 4, 6
*/