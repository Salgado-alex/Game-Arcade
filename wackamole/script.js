/*
Author: Mark S. Shenouda
Site: https://github.com/markshenouda/whack-a-mole
*/

// Declare constants for dom elements
const square = document.querySelectorAll(".square");
const mole = document.querySelectorAll(".mole");
const timeleft = document.querySelector("#time-left");
const playBtn = document.querySelector("#play-btn");
const stopBtn = document.querySelector("#stop-btn");
let score = document.querySelector("#score");
// Delcare variables for game stats
let result = 0;
let currentTime = 60;

// Sounds
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

// Sound variables
const hitSound = new sound("audio/hit.wav");
const startSound = new sound("audio/start.wav");
const endSound = new sound("audio/end.wav");

// This function randomly selects a random square and makes the mole to show up
function randomSquare() {
  if (currentTime !== 60) {
    square.forEach((className) => {
      className.classList.remove("mole");
    });

    let randomPosition = square[Math.floor(Math.random() * 9)];
    randomPosition.classList.add("mole");

    hitPosition = randomPosition.id;
  } else {
    square.forEach((className) => {
      className.classList.remove("mole");
    });
  }
}

// Fucntion that holds event listeners for clicking the square
square.forEach((id) => {
  id.addEventListener("mouseup", () => {
    if (id.id === hitPosition && currentTime !== 0) {
      result++;
      score.textContent = result;
    }
  });
});

// Function that allows the mole to move around to different squares
function moveMole() {
  let timeId = null;
  timeId = setInterval(randomSquare, 500);
}

// Function for the countdown timer
function countDown() {
  if (currentTime === 60) {
  } else if (currentTime === 0) {
    endSound.play();
    alert("Game Over, Your score is " + result);
    currentTime = 60;
    result = 0;
    score.textContent = result;
    timeleft.textContent = currentTime;
    stopBtn.style.display = "none";
    playBtn.style.display = "";
  } else {
    timeleft.textContent = currentTime;
    currentTime--;
  }
}

// Setting the interval for timer
let timeId = setInterval(countDown, 1000);

// This is a event listeners for mouse moving up and down
const body = document.querySelector("body");
body.addEventListener("mouseup", () => {
  body.classList.remove("mouseDown");
  body.classList.add("mouseUp");
});

// play sounds
body.addEventListener("mousedown", () => {
  body.classList.remove("mouseUp");
  body.classList.add("mouseDown");
  hitSound.play();
});

// This is an event listener for play button
playBtn.addEventListener("mouseup", () => {
  playBtn.style.display = "none";
  stopBtn.style.display = "";
  currentTime--;
  startSound.play();
});

// This is an event listener for stop button
stopBtn.addEventListener("mouseup", () => {
  stopBtn.style.display = "none";
  playBtn.style.display = "";
  currentTime = 60;
  endSound.play();
  alert("Game Over, Your score is " + result);
  result = 0;
  timeleft.textContent = currentTime;
  score.textContent = result;
});

// Calls this function when the game starts
moveMole();
