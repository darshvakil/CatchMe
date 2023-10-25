const numRows = 10;
const numCols = 10;
let playerX = 0;
let playerY = 0;
let aiCell; 
let gameInterval; 
let isGameRunning = false;

function createGameBoard() {
  const gameBoard = document.getElementById('game-board');
  for (let row = 0; row < numRows; row++) {
    const tr = document.createElement('tr');
    for (let col = 0; col < numCols; col++) {
      const td = document.createElement('td');
      tr.appendChild(td);
    }
    gameBoard.appendChild(tr);
  }
}

function updatePlayerPosition() {
  const cells = document.querySelectorAll('td');
  cells.forEach((cell, index) => {
    const row = Math.floor(index / numCols);
    const col = index % numCols;

    if (row === playerY && col === playerX) {
      cell.classList.add('player');
    } else {
      cell.classList.remove('player');
    }
  });
}

function movePlayer(event) {
    if (isGameRunning) {
      switch (event.key) {
        case 'ArrowUp':
          if (playerY > 0) playerY--;
          break;
        case 'ArrowDown':
          if (playerY < numRows - 1) playerY++;
          break;
        case 'ArrowLeft':
          if (playerX > 0) playerX--;
          break;
        case 'ArrowRight':
          if (playerX < numCols - 1) playerX++;
          break;
      }
  
      updatePlayerPosition();
    }
  }

function startGame() {
    clearInterval(gameInterval); 
    gameInterval = setInterval(gameLoop, 500); 
    isGameRunning = true; 
  }
  
  function stopGame() {
    clearInterval(gameInterval);
    isGameRunning = false;
    playerX = 0;
    playerY = 0; 
    aiX = 0;
    aiY = 0;

  }
  
  function pauseGame() {
    clearInterval(gameInterval);
    isGameRunning = false; 
  }
  
  function resumeGame() {
    startGame();
    isGameRunning = true; 
  }
  

let aiX = Math.floor(Math.random() * numCols);
let aiY = Math.floor(Math.random() * numRows);


createGameBoard();


const aiIndex = aiY * numCols + aiX;
aiCell = document.querySelectorAll('td')[aiIndex];
aiCell.classList.add('ai-box');


function gameLoop() {
  aiCell.classList.remove('ai-box');
  updateAIPosition();
}

function updateAIPosition() {
  aiCell.style.removeProperty('background-color');

  if (aiX < playerX) aiX++;
  else if (aiX > playerX) aiX--;

  if (aiY < playerY) aiY++;
  else if (aiY > playerY) aiY--;


  if (aiX === playerX && aiY === playerY) {
  
    clearInterval(gameInterval); 
    isGameRunning = false;
    if (confirm('AI has caught you! Game over. Click OK to restart the game.')) {
      window.location.reload();
    }
  }

  const aiIndex = aiY * numCols + aiX;
  aiCell = document.querySelectorAll('td')[aiIndex];
  aiCell.classList.add('ai-box');
}

updatePlayerPosition();
document.addEventListener('keydown', movePlayer);

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('stopButton').addEventListener('click', stopGame);
document.getElementById('pauseButton').addEventListener('click', pauseGame);
document.getElementById('resumeButton').addEventListener('click', resumeGame);


