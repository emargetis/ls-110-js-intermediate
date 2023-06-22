let statement = "The Flintstones Rock";

let obj = {};

statement.split("").forEach(letter => {
  if (Object.keys(obj).includes(letter)) {
    obj[letter] += 1;
  } else if (letter !== ' ') {
    obj[letter] = 1;
  }
});

console.log(obj);