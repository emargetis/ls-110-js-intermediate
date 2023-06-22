let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];

let obj = {};

flintstones.forEach((element, idx) => obj[element] = idx);

console.log(obj);