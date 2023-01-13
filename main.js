'use strict';

const Player = (mark, name) => {
  return {
    mark,
    name,
  };
};

let playerOne;
let playerTwo;

// Grab DOM Elements
const onePlayerButton = document.getElementById('one-player-game');
const twoPlayerButton = document.getElementById('two-player-game');
const opponentTitle = document.getElementById('opponent-title');
const heroTitle = document.getElementById('hero-title');
const playerOneTitle = document.querySelector('.left');
const playerTwoTitle = document.querySelector('.right');
const body = document.getElementById('body');
const titleArea = document.getElementById('title-area');
const playAgainButton = document.getElementById('play-again');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');

//Game setup
window.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    if (!input1.value) {
      input1.value = 'Player 1';
    }
    if (!input2.value) {
      input2.value = 'Player 2';
    }
    playerOne = Player('X', input1.value);
    playerTwo = Player('O', input2.value);
    input1.classList.add('hidden');
    input2.classList.add('hidden');
    heroTitle.innerText = playerOne.name;
    opponentTitle.innerText = playerTwo.name;
  }
  playerOneTitle.classList.add('activePlayer');
});

playAgainButton.addEventListener('click', function () {
  gameLogic.resetGame();
});

// Game board stuff
const gameBoard = (() => {
  let state = ['', '', '', '', '', '', '', '', ''];
  const boardTiles = document.querySelectorAll('.square');
  return {
    state,
    boardTiles,
  };
})();

for (let i = 0; i < gameBoard.boardTiles.length; i++) {
  gameBoard.boardTiles[i].addEventListener('click', function () {
    if (gameBoard.state[i] != '') {
      return;
    } else {
      if (!gameLogic.whoseTurn) {
        gameBoard.state[i] = playerOne.mark;
        displayController.refreshBoard();
        displayController.activePlayer();
        gameLogic.whoseTurn = !gameLogic.whoseTurn;
        gameLogic.checkWinner();
        gameLogic.checkTie();
      } else {
        gameBoard.state[i] = playerTwo.mark;
        displayController.refreshBoard();
        displayController.activePlayer();
        gameLogic.whoseTurn = !gameLogic.whoseTurn;
        gameLogic.checkWinner();
        gameLogic.checkTie();
      }
    }
  });
}
const gameLogic = (() => {
  let whoseTurn = false;
  let winner = false;
  let winningPlayer = '';
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
  let winningCombo = [];
  const checkWinner = () => {
    for (let i = 0; i < winningCombinations.length; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard.state[winningCombinations[i][j] == '']) {
          return;
        } else {
          winningCombo[j] = [
            gameBoard.state[winningCombinations[i][j]],
            winningCombinations[i][j],
          ];
        }
      }
      if (
        winningCombo[0][0] === winningCombo[1][0] &&
        winningCombo[1][0] === winningCombo[2][0] &&
        winningCombo[0][0] !== '' &&
        winningCombo[1][0] !== ''
      ) {
        winner = true;
        if (winningCombo[0][0] === 'X') {
          gameLogic.winningPlayer = playerOne.name;
        } else {
          gameLogic.winningPlayer = playerTwo.name;
        }
        displayController.somebodyWon();
        displayController.activePlayer();
        displayController.togglePlayAgain();
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
      displayController.togglePlayAgain();
      displayController.activePlayer();
    }
  };
  const resetGame = () => {
    if (winningPlayer === playerOne.name) {
      displayController.activePlayer();
    }
    displayController.togglePlayAgain();
    for (let i = 0; i < gameBoard.state.length; i++) {
      gameBoard.state[i] = '';
    }
    displayController.refreshBoard();
    gameLogic.winningCombo = [];
    gameLogic.winner = false;
    gameLogic.whoseTurn = false;
    gameLogic.winningPlayer = '';
    titleArea.innerText = 'Tic Tac Toe';
    body.classList.toggle('somebodyWon');
    for (let i = 0; i < 9; i++) {
      gameBoard.boardTiles[i].style.color = 'white';
    }
  };

  return {
    whoseTurn,
    checkWinner,
    winningPlayer,
    winningCombo,
    checkTie,
    resetGame,
  };
})();

const displayController = (() => {
  const activePlayer = () => {
    playerOneTitle.classList.toggle('activePlayer');
    playerTwoTitle.classList.toggle('activePlayer');
  };
  const refreshBoard = () => {
    for (let i = 0; i < gameBoard.boardTiles.length; i++) {
      gameBoard.boardTiles[i].innerText = gameBoard.state[i];
    }
  };
  const somebodyWon = () => {
    body.classList.add('somebodyWon');
    titleArea.innerText = `${gameLogic.winningPlayer} won the game!`;
    for (let i = 0; i < 3; i++) {
      gameBoard.boardTiles[gameLogic.winningCombo[i][1]].style.color = 'lime';
    }
  };
  const endInTie = () => {
    titleArea.innerText = 'The match is a draw!';
  };

  const togglePlayAgain = () => {
    playAgainButton.classList.toggle('hidden');
  };

  return {
    activePlayer,
    refreshBoard,
    somebodyWon,
    endInTie,
    togglePlayAgain,
  };
})();
