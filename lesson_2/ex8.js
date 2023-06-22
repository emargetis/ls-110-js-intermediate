let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

Object.values(obj).forEach(array => {
  array.forEach(string => {
    string.split('').forEach(letter => {
      if ('aeiou'.includes(letter.toLowerCase())) {
        console.log(letter);
      }
    });
  });
});