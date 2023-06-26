//Global Constant Declarations -------------------------------------------------
const readline = require('readline-sync');
const MAX_NUMBER_VALUE = 10;
const ACE_VALUE = 11;
const TWENTY_ONE = 21;
const DEALER_LIMIT = 17;
const SUITS = ['H', 'D', 'S', 'C'];
const FACECARDS = ['J', 'Q', 'K'];
const AGAIN_VALUES = ['y', 'n'];
const MOVE_VALUES = ['h', 's'];
const MATCH_WINS = 3;
const AGAIN_RESPONSES = ['y',, 'yes', 'n', 'no'];

//Function Definitions ---------------------------------------------------------
//Output message
function prompt(msg) {
  console.log(`=> ${msg}`);
} 

//Displays divider
function printDivider() {
  console.log('\n------------------------------------------------------------');
}

function displayWelcomeMessage() {
  prompt('Welcome to 21! First one to 3 win three hands, wins the overall match.' +
        '\nTo win a hand, stay under 21, but have a higher score than dealer.');
}

//Create deck of 52 cards
function initializeDeck() {
  let deck = [];
  //Add number cards
  for (let val = 2; val <= MAX_NUMBER_VALUE; val += 1 ) {
    SUITS.forEach(suit => {
      deck.push([val.toString() + suit, val]); //Add nested array to deck
    });
  }

  //Add Face Cards
  SUITS.forEach(suit => {
    FACECARDS.forEach(card => {
      deck.push([card + suit, MAX_NUMBER_VALUE]);
    });
  });

  //Add Ace
  SUITS.forEach(suit => {
    deck.push(['A' + suit, ACE_VALUE]);
  });

  return deck;
}

//Shuffle deck of cards in random order
function shuffleDeck(deck) {
  for (let index = deck.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [deck[index], deck[otherIndex]] = [deck[otherIndex], deck[index]]; // swap elements
  }
}

//Move two cards into each hand from the deck in alternating order
function dealInitialHands(deck, playerHand, dealerHand) {
  dealCard(deck, playerHand);
  dealCard(deck, dealerHand);
  dealCard(deck, playerHand);
  dealCard(deck, dealerHand);
}

//Return boolean based on whether the hand is busted
function busted(handTotal) {
  return handTotal > TWENTY_ONE;
}

function dealerLimitReached(handTotal) {
  return handTotal >= DEALER_LIMIT;
}

function convertAces(hand) {
  let handTotal = getHandTotal(hand);

  for (let card = 0; card < hand.length; card++) {
    if (hand[card][0][0] === 'A') {
      hand[card][1] = 1;
      handTotal = getHandTotal(hand); //recompute hand total
    }

    if (handTotal <= TWENTY_ONE) break; //hand total less than 21 now break
  }
}

//Validate input on if user wants to play again
function stayOrHit() {
  prompt(`Do you want to stay or hit? Type "s" for stay or "h" for hit`);
  let move = readline.question().trim().toLowerCase();

  while (true) {
    if (MOVE_VALUES.includes(move)) break;
    prompt('Invalid input. Type "s" for stay or "h" for hit');
    move = readline.question().trim().toLowerCase();
  }

  return move;
}

//Remove card from deck and add it to respective hand
function dealCard(deck, hand) {
  hand[hand.length] = deck.pop();
}

//Display first card in hand
function displayFirstCard(hand) {
  prompt(`Dealer's Visible Card: ${hand[0][0]}`);
}

//Display full hand for player
function displayFullHand(hand, handTotal, owner) {
  let handOutput = hand.map(card => card[0]).join(', ');

  if (owner === 'player') {
    prompt(`Your hand: ${handOutput}`);
    prompt(`Your hand total: ${handTotal}`);
  } else if (owner === 'dealer') {
    prompt(`Dealer's hand: ${handOutput}`);
    prompt(`Dealer's hand total: ${handTotal}`);
  }

}

//Display winner
function displayWinner(dealerHand, dealerTotal, playerHand, playerTotal, score) {
  printDivider();
  prompt('***Result');
  displayFullHand(dealerHand, dealerTotal, 'dealer');
  displayFullHand(playerHand, playerTotal, 'player');

  if (playerTotal > TWENTY_ONE) {
    prompt('***You busted. You lose :(');
    adjustScore('dealer', score);
  } else if (dealerTotal > TWENTY_ONE) {
    prompt('***Dealer busted. You win!!!!');
    adjustScore('player', score);
  } else if (dealerTotal > playerTotal) {
    prompt('***Dealer beat you. You lose :(');
    adjustScore('dealer', score);
  } else if (dealerTotal < playerTotal) {
    prompt('***You beat dealer. You win!!!!');
    adjustScore('dealer', score);
  } else {
    prompt('***Game was a push');
  }
}

//return the total of a given hand
function getHandTotal(hand) {
  return hand.reduce((sum, card) => sum + card[1], 0);
}

function displayMatchWinner(score) {
  
  if (score[0] === MATCH_WINS) {
    prompt('Player wins overall match!');
  } else if (score[1] === MATCH_WINS) {
    prompt('Dealer wins overall match :(');
  }
}

function adjustScore (winner, score) {
  if (winner === 'player') {
    score[0] += 1;
  } else if (winner === 'dealer') {
    score[1] += 1;
  }
}

//Display score for match
function displayScoreBoard(score) {
  prompt(`Current score is: ${score[0]} player wins | ${score[1]} dealer wins`);
}

//Validate input on playing another game
function playAgain() {
  prompt('Do you want to play another hand? (type "y" or "n")');
  let answer = readline.question().trim().toLowerCase();

  while (true) {
    if (AGAIN_VALUES.includes(answer)) break;
    prompt('Invalid input. Please enter "y" or "n"');
    answer = readline.question().trim().toLowerCase();
  }

  return answer;
}

//Main Program -----------------------------------------------------------------
while (true) {
  console.clear();
  displayWelcomeMessage();
  
  let score = [0, 0];
  printDivider();
  printDivider();
  displayScoreBoard(score);
  
  //Match play
  while(true) {

    //Hand play
    while (true) {
      let deck = initializeDeck();
      let playerHand = [];
      let dealerHand = [];
      let playerTotal;
      let dealerTotal;
  
      //Shuffle deck
      shuffleDeck(deck);
  
      //Deal initial cards
      dealInitialHands(deck, playerHand, dealerHand);
  
      //Player turn
      while (true) {
        playerTotal = getHandTotal(playerHand);
  
        //If busted, attempt to convert Ace values from 11 to 1
        if (busted(playerTotal)) {
          convertAces(playerHand);
          playerTotal = getHandTotal(playerHand);
        }
  
        //If hand total still more than 21 end player turn
        if (busted(playerTotal)) break;
  
        //Show player the dealer's hand and their current hand
        printDivider();
        displayFirstCard(dealerHand);
        displayFullHand(playerHand, playerTotal, 'player');
  
        //Ask player if they want to stay or hit. Break out of loop if they stay
        let decision = stayOrHit();
        if (decision === 's') break;
  
        //Deal another card
        dealCard(deck, playerHand);
      }
  
      //Check to see if user busted, if so exit hand and tell them dealer won
      if (busted(playerTotal)) {
        displayWinner(dealerHand, dealerTotal, playerHand, playerTotal, score);
        break;
      }
  
      //Dealer turn
      while (true) {
        dealerTotal = getHandTotal(dealerHand);
        //If busted, attempt to convert Ace values from 11 to 1
        if (busted(dealerTotal)) {
          convertAces(dealerHand);
          dealerTotal = getHandTotal(dealerHand);
        }
  
        if (dealerLimitReached(dealerTotal)) break;
  
        //Deal another card
        dealCard(deck, dealerHand);
      }
  
      //Check to see if dealer busted, if so exit hand and tell user they won
      if (busted(dealerTotal)) {
        displayWinner(dealerHand, dealerTotal, playerHand, playerTotal, score);
        break;
      }
  
      //Display winner if neither player busted
      displayWinner(dealerHand, dealerTotal, playerHand, playerTotal, score);
      break;
    }
    
    printDivider();
    printDivider();
    //Increment score accordingly
    adjustScore(score);
    //Show current score
    displayScoreBoard(score);

    if (score[0] === MATCH_WINS || score[1] === MATCH_WINS) {
      displayMatchWinner(score);
      break;
    } 
  }

  printDivider();
  //Ask user if they want to play again
  let again = playAgain();
  if (again === 'n') break;
}
