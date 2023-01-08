'use strict';

const Player = (mark) => {
    let turn = false;
    return {
        turn,
        mark
    }
}

const playerOne = Player('X');
const playerTwo = Player('O');

// Grab DOM Elements
const onePlayerButton = document.getElementById('one-player-game');
const twoPlayerButton = document.getElementById('two-player-game');
const modalWindow = document.querySelector('.modal');
const opponentTitle = document.getElementById('opponent-title');
const playerOneTitle = document.querySelector('.left');
const playerTwoTitle = document.querySelector('.right');
const body = document.getElementById('body');
const titleArea = document.getElementById('title-area');

function closeModal () {
    modalWindow.classList.add('hidden')
}
//Game setup
onePlayerButton.addEventListener('click', function () {
    opponentTitle.innerText = 'NPC';
    playerOneTitle.classList.add('activePlayer');
    gameLogic.whoseTurn = 0;
    closeModal();
} )
twoPlayerButton.addEventListener('click', function () {
    opponentTitle.innerText = 'Player 2';
    playerOneTitle.classList.add('activePlayer');
    gameLogic.whoseTurn = 0;
    closeModal();
})


// Game board stuff
const gameBoard = (() => {
    let state = ['a','b','c','d','e','f','g','h','i'];
    const boardTiles = document.querySelectorAll('.square');
    return {
        state,
        boardTiles
    }
})();

const gameLogic = (() => {
    let whoseTurn = 0;
    let winner = false;
    let winningPlayer = 'Player 1';
    const winningCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8],[2,4,6]];
    const checkWinner = (winningCombinations) => {

    }
    return {
       whoseTurn,
       checkWinner, winningPlayer
    }
})();

const displayController = (() => {
    const activePlayer = () => {
        playerOneTitle.classList.toggle('activePlayer');
        playerTwoTitle.classList.toggle('activePlayer')
    }
    const refreshBoard = () => {
       for (let i = 0; i < gameBoard.boardTiles.length; i++) {
            gameBoard.boardTiles[i].innerText = gameBoard.state[i];
       }
    }
    const somebodyWon = () => {
       body.classList.add('somebodyWon');
       titleArea.innerText = `${gameLogic.winningPlayer} won the game!`

    }
    return {
       activePlayer, refreshBoard, somebodyWon
    }
})();