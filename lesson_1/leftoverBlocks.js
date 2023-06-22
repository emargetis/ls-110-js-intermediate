function calculateLeftoverBlocks(totalBlocks) {
  let usedBlocks = 0;
  let row = 1;
  
  while (row**2 + usedBlocks <= totalBlocks) {
    usedBlocks += row**2;
    row += 1;
  }
  
  return totalBlocks - usedBlocks;
}

console.log(calculateLeftoverBlocks(0) === 0); //true
console.log(calculateLeftoverBlocks(1) === 0); //true
console.log(calculateLeftoverBlocks(2) === 1); //true
console.log(calculateLeftoverBlocks(4) === 3); //true
console.log(calculateLeftoverBlocks(5) === 0); //true
console.log(calculateLeftoverBlocks(6) === 1); //true
console.log(calculateLeftoverBlocks(14) === 0); //true
console.log(calculateLeftoverBlocks(25) === 11); //true
console.log(calculateLeftoverBlocks(30) === 0); //true