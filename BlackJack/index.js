var playerFirstCard 
var playerSecondCard
var dealerFirstCard 
var dealerSecondCard
let playerArrCards = [];
let dealerArrCards = [];
let playerSum = 0;
let dealerSum = 0;
var hasBlackJack = false
var isAlive = true
var message = ""

// need to use # to select id in querySelector and . to select class in querySelector
var messageEl = document.getElementById("message-el")
var playerSumEl = document.querySelector("#playerSum-el")
var playerCardsEl = document.querySelector("#playerCards-el")
var dealerSumEl = document.querySelector("#dealerSum-el")
var dealerCardsEl = document.querySelector("#dealerCards-el")
var newGameEl = document.querySelector("#newGame-el");

//Function that generates a random card
function getRandomCard() {
    // The outer Math.floor function rounds the number down to the nearest whole number and the inner Math.random function generates a random number between 1 and 10
    var randomCard = Math.floor(Math.random() * 13) + 1
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

// newGameEl.addEventListener('click', restartGame);

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
    isAlive = true; // Reset isAlive to true
    message = "";
    startGame(); // Start a new game
    dealerSumEl.textContent = "Sum: "
}

//Function that starts the game
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
        var addCard = getRandomCard();
        playerArrCards.push(addCard);
        playerSum += addCard;

        if (playerSum > 21) {
            message = "You're out of the game!";
            isAlive = false;
        }
    renderGame()
}

function stay() {
    if (!isAlive || hasBlackJack) return;

    // Dealer logic
    while (dealerSum < 17) {
        let addCard = getRandomCard();
        dealerArrCards.push(addCard);
        dealerSum += addCard;
    }
    determineWinner();
}

function determineWinner() {
    let dealerCardsT = "Cards: ";
    dealerCardsEl.textContent = " "
    for(let i = 0; i < dealerArrCards.length; i++){
        dealerCardsT += dealerArrCards[i] + " ";
    }
    dealerCardsEl.textContent = dealerCardsT
    dealerSumEl.textContent = "Sum: " + dealerSum

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


