//Global Constant Declarations -------------------------------------------------
const readline = require('readline-sync');
const MAX_NUMBER_CARD = 10;
const ACE_VAlUE = 11;
const TWENTY_ONE = 21;
const DEALER_LIMIT = 17;
const SUITS = ['H', 'D', 'S', 'C'];
const FACECARDS = ['J', 'Q', 'K']; 
const AGAIN_VALUES = ['y', 'n'];
const MOVE_VALUES = ['h', 's'];

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
  prompt('Welcome to 21! Stay under 21, but have a higher score than the dealer');
}

//Create deck of 52 cards
function initializeDeck() {
  let deck = [];
  //Add number cards
  for (let val = 2; val <= MAX_NUMBER_CARD; val += 1 ) {
    SUITS.forEach(suit => {
      deck.push([val.toString() + suit, val]); //Add nested array to deck
    });
  }

  //Add Face Cards
  SUITS.forEach(suit => {
    FACECARDS.forEach(card => {
      deck.push([card + suit, MAX_NUMBER_CARD]); 
    });
  });

  //Add Ace
  SUITS.forEach(suit => {
    deck.push(['A' + suit, ACE_VAlUE]); 
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

//Move two cards into each hand from the deck in alternatin fashion
function dealInitialHands(deck, playerHand, dealerHand) {
    dealCard(deck, playerHand);
    dealCard(deck, dealerHand);
    dealCard(deck, playerHand);
    dealCard(deck, dealerHand);
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
function displayFullHand(hand, owner) {
  let handOutput = hand.map(card => card[0]).join(', ');
  
  if (owner === 'player') {
    prompt(`Your hand: ${handOutput}`);
    prompt(`Your hand total: ${getHandTotal(hand)}.`);
  } else if (owner === 'dealer') {
    prompt(`Dealer's hand: ${handOutput}`);
    prompt(`Dealer's hand total: ${getHandTotal(hand)}.`);
  }
  
}

//return the total of a given hand
function getHandTotal(hand) {
  return hand.reduce((sum, card, idx) => sum += hand[idx][1], 0);
}

//Main Program -----------------------------------------------------------------
while (true) {
  console.clear();
  
  //display welcome message
  displayWelcomeMessage();
  
  while(true) {
    let deck = initializeDeck();
    let playerHand = [];
    let playerHandTotal;
    let dealerHand = [];
    let dealerHandTotal;
    
    //Shuffle deck
    shuffleDeck(deck);
    
    //Deal initial cards
    dealInitialHands(deck, playerHand, dealerHand);
    
    //Player turn
    while (true) {
      printDivider();
      playerHandTotal = getHandTotal(playerHand);

      //If busted, attempt to convert Ace values from 11 to 1
      if (playerHandTotal > TWENTY_ONE) {
        for (let card = 0; card < playerHand.length; card++) {
          if (playerHand[card][0][0] === 'A') {
            playerHand[card][1] = 1;
            playerHandTotal = getHandTotal(playerHand); //recompute hand total
          }
          
          if (playerHandTotal <= TWENTY_ONE) break; //hand total less than 21 now break
        }
      }
      
      //Show player the dealer's hand and their current hand
      displayFirstCard(dealerHand);
      displayFullHand(playerHand, 'player');
      
      //If hand total still more than 21 end player turn
      if (playerHandTotal > TWENTY_ONE) break;
      
      //Ask player if they want to stay or hit. Break out of loop if they stay
      let decision = stayOrHit();
      
      if (decision === 'h') {
        dealCard(deck, playerHand);
      } else if (decision === 's') {
        break;
      }
    }
    
    //Check to see if user busted and if so exit hand and tell them dealer won
    if (playerHandTotal > TWENTY_ONE) {
      printDivider();
      displayFullHand(playerHand, 'player');
      prompt('You busted. You lose :(');
      break;
    }
    
    //Dealer turn
    while(true) {
      dealerHandTotal = getHandTotal(dealerHand);
      
      //If busted, attempt to convert Ace values from 11 to 1
      if (dealerHandTotal > TWENTY_ONE) {
        for (let card = 0; card < dealerHand.length; card++) {
          if (dealerHand[card][0][0] === 'A') {
            dealerHand[card][1] = 1;
            dealerHandTotal = getHandTotal(dealerHand); //recompute hand total
          }
          
          if (dealerHandTotal <= TWENTY_ONE) break; //hand total less than 21 now break
        }
      }
      
      if (dealerHandTotal > DEALER_LIMIT) {
        break;
      } else {
        dealCard(deck, dealerHand);
      }
    }

    //Check to see if user busted and if so exit hand and tell them dealer won
    if (dealerHandTotal > TWENTY_ONE) {
      printDivider();
      displayFullHand(dealerHand, 'dealer');
      displayFullHand(playerHand, 'player');
      prompt('Dealer busted. You win!!!!!!!!!!!!!!');
      break;
    }

    //Compare hands and display winner
    printDivider();
    displayFullHand(dealerHand, 'dealer');
    displayFullHand(playerHand, 'player');

    break;
  }
  
  printDivider();
  //Ask user if they want to play again
  let again = playAgain();
  if (again === 'n') break;
}
