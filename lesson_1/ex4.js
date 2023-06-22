['ant', 'bear', 'caterpillar'].pop().length;

/*
The return value is 11 because the `.pop` method destructively removes the last element from
the calling array and returns that element. That element is a string so we then
access the lenght of the string using the `.length` property of the word `'caterpillar'`.

*/