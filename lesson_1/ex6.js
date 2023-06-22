let arr = [1, 2, 3, 4, 5]
arr.fill(1, 1, 5);

/* 
The return value for `arr.fill` is [1, 1, 1, 1, 1] because the fill
method replaces each element from the array with the first argument passed in
as an argument from the position of the second argument passed in up through the 
position of the last argument passed in.

The method is destructive. We can figure out by logging the value of `arr` to
the console or writing a strict equality statement that compares line 2 to arr:
```
arr === arr.fill(1, 1, 5);
```

*/