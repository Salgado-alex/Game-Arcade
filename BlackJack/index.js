// Delcaring all varaibles that I will use
let playerFirstCard 
let playerSecondCard
let dealerFirstCard 
let dealerSecondCard
let playerArrCards = [];
let dealerArrCards = [];
let playerSum = 0;
let dealerSum = 0;
let hasBlackJack = false
let isAlive = true
let message = ""

// Need to use # to select id in querySelector and . to select class in querySelector
let messageEl = document.getElementById("message-el")
let playerSumEl = document.querySelector("#playerSum-el")
let playerCardsEl = document.querySelector("#playerCards-el")
let dealerSumEl = document.querySelector("#dealerSum-el")
let dealerCardsEl = document.querySelector("#dealerCards-el")
let newGameEl = document.querySelector("#newGame-el");

// Function that generates a random card
function getRandomCard() {
    // The outer Math.floor function rounds the number down to the nearest whole number and the inner Math.random function generates a random number between 1 and 10
    let randomCard = Math.floor(Math.random() * 13) + 1
    // If the new card is 1(ACE), return 11
    if (randomCard === 1) {
        return 11
    }
    // If the new card is greater than 10(Jack, Queen, King), return 10
    else if (randomCard >= 11) {
        return 10
    }
    else{
        return randomCard;
    }           
}

// Restarts new game
function restartGame() {
    playerFirstCard = 0;
    playerSecondCard = 0;
    dealerFirstCard = 0;
    dealerSecondCard = 0;
    playerArrCards = [];
    dealerArrCards = [];
    playerSum = 0;
    dealerSum = 0;
    hasBlackJack = false;
    isAlive = true; 
    message = "";
    startGame(); 
    dealerSumEl.textContent = "Sum: "
}

// Function that starts the game
function startGame() {
    playerFirstCard = getRandomCard()
    playerSecondCard = getRandomCard()
    dealerFirstCard = getRandomCard()
    dealerSecondCard = getRandomCard()
    playerArrCards = [playerFirstCard, playerSecondCard]
    dealerArrCards = [dealerFirstCard, dealerSecondCard]
    playerSum = playerFirstCard + playerSecondCard
    dealerSum = dealerFirstCard + dealerSecondCard
    let dealerCardsText = "Cards: ";
    dealerCardsEl.textContent = dealerCardsText + dealerArrCards[0] + ' *' ;
    renderGame()
}

//Function that renders the game
function renderGame() {
    // Renders random cards to player and dealer
    let playerCardsText = "Cards: ";
    for(let i = 0; i < playerArrCards.length; i++){
        playerCardsText += playerArrCards[i] + " ";
    }
    playerCardsEl.textContent = playerCardsText;
    playerSumEl.textContent = "Sum: " + playerSum;
    messageEl.textContent = message;
}

//Function that draws a new card
function hit() {
    if (!isAlive || hasBlackJack) return;
        // Gives card to player if hit is pressed
        let addCard = getRandomCard();
        playerArrCards.push(addCard);
        playerSum += addCard;
        // Player sum is greater than 21 he is out of the game
        if (playerSum > 21) {
            message = "You're out of the game!";
            isAlive = false;
        }
    renderGame()
}

// Function that determines how many more cards thw dealer will get until he reaches 17 or more
function stay() {
    // Checks if game is still going on
    if (!isAlive || hasBlackJack) return;
    // Dealer logic
    while (dealerSum < 17) {
        let addCard = getRandomCard();
        dealerArrCards.push(addCard);
        dealerSum += addCard;
    }
    determineWinner();
}

// Determines who wins
// Gets called when stay is pressed
function determineWinner() {
    // prints out dealers cards
    let dealerCardsT = "Cards: ";
    dealerCardsEl.textContent = " "
    for(let i = 0; i < dealerArrCards.length; i++){
        dealerCardsT += dealerArrCards[i] + " ";
    }
    dealerCardsEl.textContent = dealerCardsT
    dealerSumEl.textContent = "Sum: " + dealerSum
    // determines who wins
    if (playerSum > 21) {
        message = "You're out of the game!";
    } else if (dealerSum > 21 || dealerSum < playerSum) {
        message = "You win!";
    } else if (dealerSum === playerSum) {
        message = "It's a draw!";
    } else {
        message = "Dealer wins!";
    }
    renderGame();
}


