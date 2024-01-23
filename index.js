let board = [];
let boardForReseting = [];
let tempBoard = [];
let iterationInterval;
let numberOfIterations = 0;

const iterationsCounter = document.querySelector(".number-of-iteration");
iterationsCounter.textContent = numberOfIterations;

const tvScreen = document.getElementById("screen");
for (let i = 0; i < 1925; i++) {
  board[i] = 0;
  tempBoard[i] = 0;
  boardForReseting[i] = 0;

  const cell = document.createElement("div");
  cell.classList.add("cell", "dead");
  cell.setAttribute("id", `${i}`);
  cell.addEventListener("click", (e) => {
    if (cell.classList.contains("dead")) {
      cell.classList.toggle("dead");
      cell.classList.toggle("live");
      board[+cell.getAttribute("id")] = 1;
      boardForReseting[+cell.getAttribute("id")] = 1;
    } else {
      cell.classList.toggle("dead");
      cell.classList.toggle("live");
      board[+cell.getAttribute("id")] = 0;
      boardForReseting[+cell.getAttribute("id")] = 0;
    }
  });
  tvScreen.appendChild(cell);
}

function getNumOfNeighbors(index) {
  let numOfNeighbors = 0;
  i = +index;
  // check for the upper row
  if (i - 55 >= 0) {
    board[i - 55] ? ++numOfNeighbors : null;
    // check for the upper right cell
    if ((i - 54) % 55 !== 0) {
      board[i - 54] ? ++numOfNeighbors : null;
    }
    // check for the upper left cell
    if (i % 55 !== 0) {
      board[i - 56] ? ++numOfNeighbors : null;
    }
  }

  // check for the lower row
  if (i + 55 <= 1925) {
    board[i + 55] ? ++numOfNeighbors : null;
    // check for the lower right cell
    if ((i + 56) % 55 !== 0) {
      board[i + 56] ? ++numOfNeighbors : null;
    }
    // check for the lower left cell
    if (i % 55 !== 1925) {
      board[i + 54] ? ++numOfNeighbors : null;
    }
  }

  // check for the right middel cell
  if ((i + 1) % 55 !== 0) {
    board[i + 1] ? ++numOfNeighbors : null;
  }

  // check for the left middel cell
  if (i % 55 !== 0) {
    board[i - 1] ? ++numOfNeighbors : null;
  }

  return numOfNeighbors;
}

function oneIteration() {
  board.forEach((cell, idx) => {
    const numOfNeighbors = getNumOfNeighbors(idx);
    if (cell) {
      if (numOfNeighbors < 2 || numOfNeighbors > 3) {
        tempBoard[idx] = 0;
      } else {
        tempBoard[idx] = 1;
      }
    } else {
      if (numOfNeighbors === 3) {
        tempBoard[idx] = 1;
      } else {
        tempBoard[idx] = 0;
      }
    }
  });

  tempBoard.forEach((cell, idx) => {
    board[idx] = cell;
  });

  numberOfIterations++;
  iterationsCounter.textContent = numberOfIterations;
}

function displayBoard() {
  const cells = tvScreen.childNodes;
  cells.forEach((cell, idx) => {
    if (board[idx]) {
      cell.classList.add("live");
      cell.classList.remove("dead");
    } else {
      cell.classList.remove("live");
      cell.classList.add("dead");
    }
  });
}

function run() {
  iterationInterval = setInterval(() => {
    oneIteration();
    displayBoard();
  }, 500);
}

function stop() {
  clearInterval(iterationInterval);
}

function clearBoard() {
  const cells = tvScreen.childNodes;
  cells.forEach((cell, idx) => {
    cell.classList.remove("live");
    cell.classList.add("dead");
    board[idx] = 0;
    tempBoard[idx] = 0;
    boardForReseting[idx] = 0;
  });
  numberOfIterations = 0;
  iterationsCounter.textContent = numberOfIterations;
}

function randomBoard() {
  for (let i = 0; i < board.length; i++) {
    board[i] = Math.floor(Math.random() * 2);
    tempBoard[i] = Math.floor(Math.random() * 2);
    boardForReseting[i] = Math.floor(Math.random() * 2);
  }
}

const nextIterationBtn = document.querySelector(".next-iteration-btn");
nextIterationBtn.addEventListener("click", (e) => {
  oneIteration();
  displayBoard();
});

const startBtn = document.querySelector(".start-btn");
const startIcon = document.querySelector(".start-icon");
const stopIcon = document.querySelector(".stop-icon");

function startTheGame() {
  startBtn.classList.remove("start");
  startBtn.classList.add("stop");
  startBtn.childNodes[5].textContent = "Stop";
  startIcon.classList.add("hide");
  stopIcon.classList.remove("hide");
  run();
}

function stopTheGame() {
  startBtn.classList.add("start");
  startBtn.classList.remove("stop");
  startBtn.childNodes[5].textContent = "Start";
  startIcon.classList.remove("hide");
  stopIcon.classList.add("hide");
  stop();
}

function startAndStopTheGame() {
  if (startBtn.classList.contains("start")) {
    startTheGame();
  } else {
    stopTheGame();
  }
}

startBtn.addEventListener("click", (e) => {
  startAndStopTheGame();
});

const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", (e) => {
  stopTheGame();
  clearBoard();
});

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", (e) => {
  stopTheGame();
  boardForReseting.forEach((cell, idx) => {
    board[idx] = cell;
  });
  displayBoard();
});

const randomBtn = document.querySelector(".random-btn");
randomBtn.addEventListener("click", (e) => {
  randomBoard();
  displayBoard();
});

// #################
// popup window code
// #################

// Get the modal
var infoModal = document.querySelector(".info-modal");
var creditModal = document.querySelector(".credit-modal");
// Get the button that opens the modal
var infoBtn = document.querySelector(".info-btn");
var creditBtn = document.querySelector(".credit-btn");
// Get the <span> element that closes the modal
var infoSpan = document.getElementsByClassName("close")[0];
var creditSpan = document.getElementsByClassName("close")[1];
// When the user clicks the button, open the modal
infoBtn.onclick = function () {
  infoModal.style.display = "block";
};
creditBtn.onclick = function () {
  creditModal.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
infoSpan.onclick = function () {
  infoModal.style.display = "none";
};
creditSpan.onclick = function () {
  creditModal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == infoModal) {
    infoModal.style.display = "none";
  } else if (event.target == creditModal) {
    creditModal.style.display = "none";
  }
};

// chage the copyright year
const year = document.querySelector(".year");
year.textContent = new Date().getFullYear();
