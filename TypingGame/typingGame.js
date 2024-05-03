// Array of paragraphs for the typing test
// Cited: https://www.goodreads.com/quotes/195956-call-me-ishmael-some-years-ago---never-mind-how
const paragraphs = [
  "Call me Ishmael. Some years ago never mind how long precisely having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off then, I account it high time to get to sea as soon as I can.",
  "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters.",
  "Productivity often depends on your ability to type rapidly and accurately. This paragraph aims to assess your typing proficiency in just one minute. Consistency is key: aim for a smooth rhythm while reducing errors. Keep your focus on the screen, not on the keyboard. Relax your shoulders and keep your hands light on the keys. Are you ready? Stay calm, and don't rush. Remember, precision matters as much as speed. Complete this paragraph to find out your current words per minute rate. Let's get started!",
  "The quick brown fox jumps over the lazy dog. This classic sentence contains every letter of the alphabet, providing a useful test for typists. Imagine you're typing on a sunny day, the clock reads 10:45 a.m., and you've just finished your first coffee. It's a perfect time to practice. What will your WPM (words per minute) be? Can you beat your best record? Remember, accuracy matters just as much as speed. Let's get started and see how well you do!",
  "Typing quickly and accurately is a valuable skill, especially when you need to work efficiently. This paragraph serves as a test to measure your speed and precision. Focus on keeping a steady pace, minimizing errors, and maintaining concentration. Don't forget to breathe and relax your hands as you type. How fast can you complete this paragraph? Remember, accuracy is just as important as speed, so take your time and ensure each keypress is correct. Good luck!",
  "Tom! No answer. Tom! No answer. What's gone with that boy, I wonder? You TOM! No answer. The old lady pulled her spectacles down and looked over them about the room; then she put them up and looked out under them. She seldom or never looked through them for so small a thing as a boy; they were her state pair, the pride of her heart, and were built for 'style,' not service she could have seen through a pair of stovelids just as well. She looked perplexed for a moment, and then said, not fiercely, but still loud enough for the furniture to hear, 'Well, I lay if I get hold of you, I'll' ",
  "3 May. Bistritz. Left Munich at 8:35 P.M., on 1st May, arriving at Vienna early next morning; should have arrived at 6:46, but train was an hour late. Buda Pesth seems a wonderful place, from the glimpse which I got of it from the train and the little I could walk through the streets. I feared to go very far from the station, as we had arrived late and would start as near the correct time as possible. The impression I had was that we were leaving the West and entering the East; the most western of splendid bridges over the Danube, which is here of noble width and depth, took us among the traditions of Turkish rule.",
  "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.",
];

// Elements for interaction and output
const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".input-field");
const tryAgainBtn = document.querySelector(".reset button");
const timeTag = document.querySelector(".time span strong");
const accuracyTag = document.querySelector(".accuracy span strong");
const wpmTag = document.querySelector(".wpm span strong");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let correctCharCount = 0;
let totalChars = 0;
let isTyping = false;

function loadParagraph() {
  const randIndex = Math.floor(Math.random() * paragraphs.length);
  const paragraph = paragraphs[randIndex];

  // Construct a string of span elements for each character in the paragraph
  let paragraphHTML = paragraph
    .split("")
    .map((char) => `<span>${char}</span>`)
    .join("");

  typingText.innerHTML = paragraphHTML;

  const firstCharSpan = typingText.querySelector("span");
  firstCharSpan.classList.add("active");

  document.addEventListener("keydown", () => inputField.focus());
  typingText.addEventListener("click", () => inputField.focus());
}

// Check for correctness
function initTyping() {
  let characters = typingText.querySelectorAll("span");
  let typedChar = inputField.value[charIndex];

  if (charIndex < characters.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    if (typedChar == null) {
      // delete operations
      if (charIndex > 0) {
        charIndex--;
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      totalChars++;

      if (characters[charIndex].innerText === typedChar) {
        correctCharCount++;
        characters[charIndex].classList.add("correct");
      } else {
        characters[charIndex].classList.add("incorrect");
      }

      charIndex++;
    }

    // Update the active character highlight
    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    // Calculate accuracy
    let accuracy = Math.round((correctCharCount / totalChars) * 100);
    accuracyTag.innerText = accuracy;

    // Calculate WPM
    let wpm = Math.round((correctCharCount / 5 / (maxTime - timeLeft)) * 60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerText = wpm;
  } else {
    clearInterval(timer);
    inputField.value = "";
  }
}

// Timer function to decrease the remaining time and update the display
function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;

    // Recalculate WPM
    let wpm = Math.round((correctCharCount / 5 / (maxTime - timeLeft)) * 60);
    wpmTag.innerText = wpm;
  } else {
    clearInterval(timer);
  }
}

// Reset the game
function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = 0;
  correctCharCount = 0;
  totalChars = 0;
  isTyping = false;
  inputField.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  accuracyTag.innerText = 100;
}

loadParagraph();

inputField.addEventListener("input", initTyping);

tryAgainBtn.addEventListener("click", resetGame);
