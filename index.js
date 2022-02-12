const cardsIcon = ["fa-diamond", "fa-paper-plane-o", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-bomb"];


const deck = document.querySelector(".deck");
const cardsList = deck.getElementsByTagName("li");
const resetBoard = document.querySelector(".fa-repeat");
const starsBoard = document.querySelector(".stars");
const timerBoard = document.querySelector("time");
let timerBoardId;
let cardsOpen = 0;
let cardLast = '';
let cardsCount = 0;
let cardsMatched = 0;

let initTime = 0;
let t = 0;

let modal = document.getElementById('myModal');

let btn = document.getElementById("myBtn");

let span = document.getElementsByClassName("close")[0];
let modalMessage = document.querySelector(".modal-message");
let modalRestart = document.querySelector("button");
let modalWindow = document.getElementById("myModal");

let starsCount = 3;
const starsIcons = document.getElementsByClassName("fa-star");

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function closeCard(value) {
  let cardClose = document.getElementsByClassName("open");
  cardClose[0].className = "card";

  cardClose[0] = document.getElementsByClassName("open");
  cardClose[0].className = "card";

  document.body.style.pointerEvents = 'auto';
}


function matchedCard(value) {

  let cardMatched = document.getElementsByClassName("open");
  cardMatched[0].className = "card match show";


  cardMatched = document.getElementsByClassName("open");
  cardMatched[0].className = "card match show";
  document.body.style.pointerEvents = 'auto';

  if (cardsMatched == 8) {
    finishGame();
  }

}


function clickCard(evt) {

  let isCard = evt.target.className;

  if (isCard == "card") {

    if (initTime == 0) {

      timerBoardId = setInterval(function() {
        initTimerBoard()
      }, 1000);
      initTime++;
    }

    let cardCurrent = evt.target.querySelector("i").className;

    cardsOpen++;

    if (cardsOpen <= 2) {

      evt.target.className = "card open show";

      if (cardsOpen == 2) {
        if (cardLast == cardCurrent) {
          cardsMatched++;
          setTimeout(function() {
            matchedCard(cardLast);
          }, 800);
        } else {
          setTimeout(function() {
            closeCard(cardLast);
          }, 800);
        }

        cardsCount++;
        cardsOpen = 0;
        document.body.style.pointerEvents = 'none';
        initMovesCounter(cardsCount);
        switch (cardsCount) {
          case 12:
          case 24:
          case 48:
            starsCount--;
            starsIcons[starsCount].style.display = "none";
            break;

        }


      }

      cardLast = evt.target.querySelector("i").className;

    }
  }

}


function initMovesCounter(value) {
  const movesCount = document.querySelector(".moves");
  movesCount.innerHTML = value;
}

function initBoard(card, index) {
  cardsList[index].querySelector("i").className = "fa " + card;
  cardsList[index].className = "card";
  cardsList[index].addEventListener('click', clickCard);
}

function initTimerBoard() {
  timerBoard.innerHTML = t + "s";
  t++;
}

function initGame() {
  let cardShuffle = shuffle(cardsIcon);
  cardShuffle.forEach(initBoard);
  for (var i = 0; i < starsIcons.length; i++) {
    starsIcons[i].style.display = "inline-block";
  }
  cardsCount = 0;
  starsCount = 3;
  
  initMovesCounter(0);

}
function resetGame() {
  clearInterval(timerBoardId);
  t = 0;
  initTime = 0;
  cardsMatched = 0;
  timerBoard.innerHTML = t + "s";
  initGame();
}
function finishGame() {
  modalMessage.innerText = "You are winner!!! in " + t + " seconds with " + starsCount + " stars";
  modalWindow.style.display = "block";
  resetGame();
}

function startGame() {
  modalWindow.style.display = "none";
  resetGame();
}


initGame();


resetBoard.addEventListener('click', resetGame);
modalRestart.addEventListener('click', startGame);