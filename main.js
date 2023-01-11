"use strict";

const Player = (mark) => {
  return {
    mark,
  };
};

const playerOne = Player("X");
const playerTwo = Player("O");

// Grab DOM Elements
const onePlayerButton = document.getElementById("one-player-game");
const twoPlayerButton = document.getElementById("two-player-game");
const modalWindow = document.querySelector(".modal");
const opponentTitle = document.getElementById("opponent-title");
const playerOneTitle = document.querySelector(".left");
const playerTwoTitle = document.querySelector(".right");
const body = document.getElementById("body");
const titleArea = document.getElementById("title-area");

function closeModal() {
  modalWindow.classList.add("hidden");
}

//Game setup
onePlayerButton.addEventListener("click", function () {
  opponentTitle.innerText = "NPC";
  playerOneTitle.classList.add("activePlayer");
  gameLogic.whoseTurn = 0;
  closeModal();
});
twoPlayerButton.addEventListener("click", function () {
  opponentTitle.innerText = "Player 2";
  playerOneTitle.classList.add("activePlayer");
  gameLogic.whoseTurn = 0;
  closeModal();
});

// Game board stuff
const gameBoard = (() => {
  let state = ["", "", "", "", "", "", "", "", ""];
  const boardTiles = document.querySelectorAll(".square");
  return {
    state,
    boardTiles,
  };
})();

for (let i = 0; i < gameBoard.boardTiles.length; i++) {
  gameBoard.boardTiles[i].addEventListener("click", function () {
    if (gameBoard.state[i] != "") {
      return;
    } else {
      if (!gameLogic.whoseTurn) {
        gameBoard.state[i] = playerOne.mark;
        displayController.refreshBoard();
        gameLogic.checkWinner();
        gameLogic.checkTie();
        displayController.activePlayer();
        gameLogic.whoseTurn = 1;
      } else {
        gameBoard.state[i] = playerTwo.mark;
        displayController.refreshBoard();
        gameLogic.checkWinner();
        gameLogic.checkTie();
        displayController.activePlayer();
        gameLogic.whoseTurn = 0;
      }
    }
  });
}
const gameLogic = (() => {
  let whoseTurn = 0;
  let winner = false;
  let winningPlayer = "";
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let winningCombo = ["", "", ""];
  const checkWinner = () => {
    for (let i = 0; i < winningCombinations.length; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard.state[winningCombinations[i][j] == ""]) {
          return;
        } else {
          winningCombo[j] = [
            gameBoard.state[winningCombinations[i][j]],
            winningCombinations[i][j],
          ];
        }
      }
      if (
        winningCombo[0][0] == winningCombo[1][0] &&
        winningCombo[1][0] == winningCombo[2][0] &&
        winningCombo[0][0] != "" &&
        winningCombo[1][0] != ""
      ) {
        winner = true;
        if (winningCombo[0][0] == "X") {
          gameLogic.winningPlayer = "Player 1";
        } else {
          gameLogic.winningPlayer = "Player 2";
        }
        displayController.somebodyWon();
        displayController.activePlayer();
        return;
      }
    }
  };
  const checkTie = () => {
    let gameTied = true;
    for (let i = 0; i < gameBoard.state.length; i++) {
      if (!gameBoard.state[i]) {
        gameTied = false;
      }
    }
    if (gameTied) {
      displayController.endInTie();
      displayController.activePlayer();
    }
  };
  return {
    whoseTurn,
    checkWinner,
    winningPlayer,
    winningCombo,
    checkTie,
  };
})();

const displayController = (() => {
  const activePlayer = () => {
    playerOneTitle.classList.toggle("activePlayer");
    playerTwoTitle.classList.toggle("activePlayer");
  };
  const refreshBoard = () => {
    for (let i = 0; i < gameBoard.boardTiles.length; i++) {
      gameBoard.boardTiles[i].innerText = gameBoard.state[i];
    }
  };
  const somebodyWon = () => {
    body.classList.add("somebodyWon");
    titleArea.innerText = `${gameLogic.winningPlayer} won the game!`;
    for (let i = 0; i < 3; i++) {
      gameBoard.boardTiles[gameLogic.winningCombo[i][1]].style.color = "lime";
    }
  };
  const endInTie = () => {
    titleArea.innerText = "The match is a draw!";
  };
  return {
    activePlayer,
    refreshBoard,
    somebodyWon,
    endInTie,
  };
})();
