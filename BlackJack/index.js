var firstCard 
var secondCard
var arrCards = []
var sum = 0
var hasBlackJack = false
var isAlive = false
var message = ""

var messageEl = document.getElementById("message-el")
//var sumEl = document.getElementById("sum-el")
// need to use # to select id in querySelector and . to select class in querySelector
var sumEl = document.querySelector("#sum-el")
var cardsEl = document.querySelector("#cards-el")
var chipsEL = document.querySelector("#chips-el")
var playerEl = document.querySelector("#player-el")

//object store data in-depth
//key-value pairs
var player = {
//  Key     value 
    name: "Brayan",
    chips: "145"
}



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

//Function that starts the game
function startGame() {
    isAlive = true
    firstCard = getRandomCard()
    secondCard = getRandomCard()
    arrCards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

//Function that renders the game
function renderGame() {
    cardsEl.textContent = "Cards: "

    for(var i = 0; i < arrCards.length; i++){
        cardsEl.textContent += arrCards[i] + " "
    }
    sumEl.textContent = "Sum: " + sum

    if (sum <= 20) {
        message = ("Do you want to draw a new card?")
    } 
    else if (sum === 21) {
        message = ("Wohoo! You've got Blackjack!")
        hasBlackJack = true
    }
    else {
        message = ("You're out of the game!")
        isAlive = false
    }
    messageEl.textContent = message
    playerEl.textContent = player.name + ": $" + player.chips
}

//Function that draws a new card
function newCard() {
    //Edge cases
    if (arrCards.length < 2){
        return 0
    }
    else if(hasBlackJack === true || isAlive === false){
        return 0
    }
    else{
        let addCard = getRandomCard()
        sum += addCard
        arrCards.push(addCard)
        renderGame()
    }
}


