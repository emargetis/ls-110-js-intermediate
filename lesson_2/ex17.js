const HEX_LOOKUP = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

const SECTIONS = [8, 4, 4, 4, 12];

const MAX_LOOKUP = 16;


function UUIDMaker() {
  let str = '';
  
  SECTIONS.forEach((num, index) => {
    for (let i = 0; i < num; i += 1) {
      str += HEX_LOOKUP[randomNum(MAX_LOOKUP)];
    }
    
    if (index < SECTIONS.length - 1) {
      str += '-';
    }
  });

  return str;
}

function randomNum(range) {
  return Math.floor(Math.random() * range);
}

console.log(UUIDMaker());