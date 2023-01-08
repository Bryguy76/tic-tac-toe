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

//Game setup
function closeModal () {
    modalWindow.classList.add('hidden')
}
onePlayerButton.addEventListener('click', function () {
    opponentTitle.innerText = 'NPC';
    playerOneTitle.classList.add('activePlayer');
    gameLogic.whoseTurn = 0;
  closeModal();
} )
twoPlayerButton.addEventListener('click', function () {
    opponentTitle.innerText = 'Player 2';
    closeModal();
})


// Game board stuff
const gameBoard = (() => {
    let state = [['','',''],['','',''],['','','']];

    return {
        state
    }
})();

const gameLogic = (() => {
    let whoseTurn = 0;

    return {
       whoseTurn
    }
})();

const displayController = (() => {
    const activePlayer = () => {
        playerOneTitle.classList.toggle('activePlayer');
        playerTwoTitle.classList.toggle('activePlayer')
    }

    return {
       activePlayer
    }
})();