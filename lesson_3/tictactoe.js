//Declare global constants -----------------------------------------------------
const readline = require('readline-sync');
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINNING_COMBOS = [
  ['1', '2', '3'],
  ['1', '4', '7'],
  ['1', '5', '9'],
  ['2', '5', '8'],
  ['3', '5', '7'],
  ['3', '6', '9'],
  ['4', '5', '6'],
  ['7', '8', '9']
];
const MATCH_WINS = 3;
const FIRST_MOVES = ['player', 'computer', 'choose'];
const AGAIN_RESPONSES = ['y',, 'yes', 'n', 'no'];
const CENTER_SQUARE = 5;

//Define functions -------------------------------------------------------------

//Displays the board
function displayBoard(board) {
  prompt(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);
  console.log('');
  console.log('     |     |');
  console.log(`  ${board[0]}  |  ${board[1]}  |  ${board[2]}  `);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board[3]}  |  ${board[4]}  |  ${board[5]}  `);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board[6]}  |  ${board[7]}  |  ${board[8]}  `);
  console.log('     |     |');
  console.log('');
}

//Returns blank board array containing numbered spaces at each spot
function initializeBoard() {
  let board = [];

  for (let idx = 0; idx < 9; idx += 1) {
    board[idx] = idx + 1;
  }

  return board;
}

//Displays prompt messages
function prompt(msg) {
  console.log(`=> ${msg}`);
}

//Displays divider
function printDivider() {
  console.log('\n------------------------------------------------------------');
}

//Validates input from plyaer is empty square and selects chosen square
function playerChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Choose an empty square (${joinOr(getEmptySquares(board))}):`);
    square = Number(readline.question().trim());

    if (getEmptySquares(board).includes(square)) break;

    prompt(`That's not a valid choice`);
  }

  board[square - 1] = HUMAN_MARKER;
}

//Returns formatted available moves for playerChoosesSquare() function
function joinOr(arr, separator = ', ', conjunction = 'or') {
  let length = arr.length;
  let message = '';

  if (length === 1) {
    message = arr;
  } else if (length === 2) {
    message = arr[0] + ` ${conjunction} ` + arr[1];
  } else if (length > 2) {
    message = arr.slice(0, arr.length - 1).join(separator) +
              `${separator}${conjunction} ${arr[arr.length - 1]}`;
  }

  return message;
}

//Selects computer square based on logical flow
function computerChoosesSquare(board) {
  let randomIndex = Math.floor(Math.random() * getEmptySquares(board).length);
  let offensiveMove = findAtRiskSquare(board, COMPUTER_MARKER);
  let defensiveMvove = findAtRiskSquare(board, HUMAN_MARKER);
  let centerMove = fiveOpen(board);
  let emptyRandomMove = getEmptySquares(board)[randomIndex];
  let square =  offensiveMove ||
                defensiveMvove ||
                centerMove ||
                emptyRandomMove;
  board[square - 1] = COMPUTER_MARKER;
}

//Checks if the 5 space is open
function fiveOpen(board) {
  if (board[4] === CENTER_SQUARE) return 5;
  return null;
}

//Determines if there is an open space within a winning sequence of 3 spaces
function findAtRiskSquare(board, marker) {
  let playerSquares = getOccupiedSquares(board, HUMAN_MARKER);
  let computerSquares = getOccupiedSquares(board, COMPUTER_MARKER);

  for (let combo = 0; combo < WINNING_COMBOS.length; combo += 1) {
    let comboCopy = WINNING_COMBOS[combo].slice(); //make copy of each winning combo the program loops through

    for (let space = 0; space < comboCopy.length; space += 1) {
      if (playerSquares.includes(comboCopy[space])) {
        comboCopy[space] = HUMAN_MARKER; //replaces numbers within winning combo copy with human marker if occupied by human
      } else if (computerSquares.includes(comboCopy[space])) {
        comboCopy[space] = COMPUTER_MARKER; //replaces numbers within winning combo copy with computer marker if occupied by computer
      }
    }

    if (comboCopy.filter(num => num === marker).length === 2 && //determines if there are two target markers within the winning combo
        !Number.isNaN(Number(comboCopy.filter(num => num !== marker)[0]))) { //determine if non-target marker space within winning combo is open by determining if value when coverted to string is a number
      return comboCopy.filter(num => num !== marker).join(); //return empty space number if both criteria above are true
    }
  }

  return undefined;
}

//Returns empty squares remaining on board
function getEmptySquares(board) {
  return board.filter(ele => typeof ele === 'number');
}

//Returns boolean representing whether someone won
function someoneWon(board) {
  return !!(detectWinner(board));
}

//Detects if someone has one and if so, returns string representing winner
function detectWinner(board) {
  let playerSquares = getOccupiedSquares(board, HUMAN_MARKER);
  let compSquares = getOccupiedSquares(board, COMPUTER_MARKER);

  for (let combo = 0; combo < WINNING_COMBOS.length; combo += 1) {
    if (WINNING_COMBOS[combo].every(num => playerSquares.includes(num))) { //checks if every number within a given winning combo array is contained within string of human occupied spaces
      return "player";
    } else if (WINNING_COMBOS[combo].every(num => compSquares.includes(num))) { //checks if every number within a given winning combo array is contained within string of computer occupied spaces
      return "computer";
    }
  }

  return undefined;
}

//Returns string containing all occupied space numbers for a given marker
function getOccupiedSquares(board, marker) {
  let occupiedSquares = [];

  for (let space = 0; space < board.length; space += 1) {
    if (board[space] === marker) {
      occupiedSquares.push(String(space + 1));
    }
  }

  return occupiedSquares.join('');
}

//Returns boolean representing whether board is full or not
function boardFull(board) {
  return getEmptySquares(board).length === 0;
}

//Increments score of winner and return using array destructuring
function adjustScore (winner, playerScore, compScore) {
  if (winner === 'player') {
    playerScore += 1;
  } else if (winner === 'computer') {
    compScore += 1;
  }

  return [playerScore, compScore];
}

//Calls respective chooseSquare functions based on the player who should go next
function chooseSquare(board, currentPlayer) {
  if (currentPlayer === 'player') {
    playerChoosesSquare(board);
  } else {
    computerChoosesSquare(board);
  }
}

//Return string representing opposite player from input
function alternatePlayer(currentPlayer) {
  if (currentPlayer === 'player') {
    return 'computer';
  } else {
    return 'player';
  }
}

//Validate input and return player chosen to go first.
function collectFirstPlayer() {
  let currentPlayer = '';

  while (true) {
    prompt('Who would you like to go first? Choose one: \n' +   
            '   - You (type "player") \n' +   
            '   - The computer (type "computer") \n' +  
            '   - Choose randomly (type "choose")');
    currentPlayer = readline.prompt().trim().toLowerCase();
    if (FIRST_MOVES.includes(currentPlayer)) break;
  }

  //If user enters 'choose' randomly choose player or computer
  if (currentPlayer === 'choose') {
    currentPlayer = ['player', 'computer'][Math.floor(Math.random() * 2)];
  }

  return currentPlayer;
}

//Display who won each game
function displayGameWinner(board) {
  if (someoneWon(board)) {
    prompt(`${detectWinner(board)[0].toUpperCase() + detectWinner(board).slice(1)} won game!`);
  } else {
    prompt("Game is a tie!");
  }
}

//Display scoreboard for match
function displayScoreboard(playerScore, compScore) {
  prompt(`The current score is: ${playerScore} player wins | ${compScore} computer wins`);
}

//Display who won overall match
function displayMatchWinner(playerScore, compScore) {
  if (playerScore === MATCH_WINS) {
    prompt('Player wins overall match!');
  } else if (compScore === MATCH_WINS) {
    prompt('Computer wins overall match :(');
  }
}

//Ask user if they want to play anothr match
function anotherMatch() {
  prompt('Play another match? (y or n)');
  let answer = readline.question().toLowerCase();

  while (!AGAIN_RESPONSES.includes(answer)) {
    prompt('Invalid response. Please enter "y" or "no"');
    answer = readline.question().toLowerCase();
  }

  return answer;
}

//Display welcome message for match
function displayWelcomeMessage() {
  prompt(`Welcome to Tic-Tac-Toe!\n   This first to win ${MATCH_WINS} games wins the overall match`);
}

//Display thank you message for exiting program
function displayThankYouMessage() {
  prompt('Thanks for playing Tic Tac Toe!');
}

//Ask user if they want to keep playing given match
function anotherGame() {
  prompt('Ready to play the next game in the match? (y or n)');
  let answer = readline.question().toLowerCase();

  while (!AGAIN_RESPONSES.includes(answer)) {
    prompt('Invalid response. Please enter "y" or "no"');
    answer = readline.question().toLowerCase();
  }

  return answer;
}

//Main Program -----------------------------------------------------------------
while (true) {
  console.clear();
  displayWelcomeMessage();

  //Initialize scoreboard to 0
  let playWins = 0;
  let compWins = 0;

  //Choose who goes first in match and validate input
  let currentPlayer = collectFirstPlayer();

  //Overall match play loop
  while (true) {
    let board = initializeBoard();

    //Individual game play loop
    while (true) {
      console.clear();
      displayBoard(board);
      chooseSquare(board, currentPlayer);
      currentPlayer = alternatePlayer(currentPlayer);
      console.clear();
      if (someoneWon(board) || boardFull(board)) break;
    }

    //Display final board
    displayBoard(board);

    printDivider();
    //Display who won game
    displayGameWinner(board);

    //Increment scoreboard accordingly
    [playWins, compWins] = adjustScore(detectWinner(board), playWins, compWins);

    //Show current scoreboard
    displayScoreboard(playWins, compWins);
    printDivider();

    //Display match winner if there is one and exit match
    //otherwise confirm player wants to keep playing
    if (playWins === MATCH_WINS || compWins === MATCH_WINS) {
      displayMatchWinner(playWins, compWins);
      break;
    } else {
      let answer = anotherGame();
      if (answer === 'n') break;
    }
  }

  printDivider();
  //Ask user if they want to play another match
  let answer = anotherMatch();
  if (answer === 'n') break;
}

printDivider();
displayThankYouMessage();