

let playerHandEl = document.getElementById("player-hand");
let playerScoreEl = document.getElementById("score");
let playerResultEl = document.getElementById("result");

let deck = [];
let playerHand = [];

const cards = [" A", " 2", " 3", " 4", " 5", " 6", " 7", " 8", " 9", " 10", " J", " Q", " K"];
const suits = ["♥️", "♣️", "♦️", "♠️"];

function startGame() {
  if (playerResultEl.innerText === "") {
  createDeck();
  shuffleDeck();
  dealCards();
}
document.getElementById("start-btn").disabled = true;
}

function createDeck() {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < cards.length; j++) {
      deck.push(suits[i] + cards[j]);
    }
  }
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function dealCards() {
  let card1 = deck.pop();
  let card2 = deck.pop();
  playerHand = [card1, card2];
  playerHandEl.innerHTML = playerHand.join(" ");
  playerResultEl.innerText = "";
  updatePlayerScore();
}


function hit() {
  if (deck != 0 && playerResultEl.innerText === "") {
  let card = deck.pop();
  playerHandEl.innerHTML += " " + card;
  playerHand.push(card);
  updatePlayerScore();
  }
}

function getCardValue(card) {

  const rank = card.slice(-2).trim();

  if (rank === "A") {
    return 11;
  } else if (rank === "J" || rank === "Q" || rank === "K") {
    return 10;
  } else {
    return parseInt(rank);
  }
}

function updatePlayerScore() {
  let score = 0;
  let numberOfAces = 0;

  if (playerHand.length > 0) {
    for (let card of playerHand) {
      let cardValue = getCardValue(card);
      score += cardValue;

      if (card === "A") {
        numberOfAces++;
      }
    }

    while (numberOfAces > 0 && score > 21) {
      score -= 10;
      numberOfAces--;
    }
  }

  if (score > 21) {
    playerResultEl.innerText = "Bust! Try Again";
    endGame();

  } else if (score === 21) {
    playerResultEl.innerText = "Blackjack! You Won!";
    endGame();
  }

  playerScoreEl.innerText = score;

  return score;
}

function hold() {
  if (deck != 0 && playerResultEl.innerText === "") {
  updatePlayerScore()
  playerResultEl.innerText = "YOU HELD! And beat yourself in the process! Try again...";
  endGame();
  }
}

function endGame() {
  if (playerResultEl.innerText === "") {
    playerHandEl.innerHTML = "";
    playerScoreEl.innerText = "";
    playerHand = [];
    deck = [];
    createDeck();
    shuffleDeck();
    dealCards();
  }
}

function restart() {
  if (playerResultEl.innerText != "") {
    createDeck();
    shuffleDeck();
    dealCards();
}
}