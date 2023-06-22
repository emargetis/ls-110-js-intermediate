let arr = ['10', '11', '9', '7', '8'];

//console.log(arr.map(element => Number(element)).sort((a, b) => b - a));
console.log(arr.sort((a, b) => Number(b) - Number(a)));