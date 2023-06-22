[1, 2, 3].filter(num => 'hi');

/*

The code above returns [1, 2, 3] because each time the callback function 
supplied as an argument to the .filter array instance method inovked on [1, 2, 3]
is evaluated, it evaluates to true.

*/