const headerMessages = document.getElementById("headerMessages");
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessageElement = document.getElementById("winningMessage");
const playButton = document.getElementById("playButton");
const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;

startGame();

playButton.addEventListener("click", startGame);

headerMessages.innerHTML = `Who's first: <span>${circleTurn ? O_CLASS : X_CLASS}</span>`;

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  headerMessages.innerHTML = `Who's first: <span>${circleTurn ? O_CLASS : X_CLASS}</span>`;
  playButton.classList.remove("show");
}

function handleClick(event) {
  const cell = event.target;
  const currentClass = circleTurn ? O_CLASS : X_CLASS;
  // change player in the html
  headerMessages.innerHTML = `Next player: <span>${!circleTurn ? O_CLASS : X_CLASS}</span>`;
  // placeMark
  placeMark(cell, currentClass);

  // check for win and draw
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    // check for draw
    endGame(true);
  } else {
    // switch turns and the hover class
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    headerMessages.innerText = "Draw!";
  } else {
    headerMessages.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  playButton.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (circleTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
