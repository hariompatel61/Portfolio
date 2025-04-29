// Tic Tac Toe Game Logic
document.addEventListener('DOMContentLoaded', () => {
  const X_CLASS = 'x';
  const O_CLASS = 'o';
  const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  
  const cellElements = document.querySelectorAll('[data-cell]');
  const board = document.querySelector('.game-board');
  const winningMessageElement = document.querySelector('[data-winning-message-text]');
  const restartButton = document.querySelector('[data-restart-button]');
  const xScoreElement = document.querySelector('.score-player:nth-child(1) span');
  const oScoreElement = document.querySelector('.score-player:nth-child(2) span');
  const tiesScoreElement = document.querySelector('.score-ties span');
  
  let oTurn;
  let xScore = 0;
  let oScore = 0;
  let ties = 0;
  
  startGame();
  
  restartButton.addEventListener('click', startGame);
  
  function startGame() {
    oTurn = false;
    cellElements.forEach(cell => {
      cell.classList.remove(X_CLASS);
      cell.classList.remove(O_CLASS);
      cell.removeEventListener('click', handleClick);
      cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.textContent = '';
  }
  
  function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    
    placeMark(cell, currentClass);
    
    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
      setBoardHoverClass();
    }
  }
  
  function endGame(draw) {
    if (draw) {
      ties++;
      tiesScoreElement.textContent = ties;
      winningMessageElement.textContent = 'Game ended in a draw!';
    } else {
      if (oTurn) {
        oScore++;
        oScoreElement.textContent = oScore;
        winningMessageElement.textContent = 'O Wins!';
      } else {
        xScore++;
        xScoreElement.textContent = xScore;
        winningMessageElement.textContent = 'X Wins!';
      }
    }
  }
  
  function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
  }
  
  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerHTML = currentClass === X_CLASS ? 
      '<ion-icon name="close-outline"></ion-icon>' : 
      '<ion-icon name="ellipse-outline"></ion-icon>';
  }
  
  function swapTurns() {
    oTurn = !oTurn;
  }
  
  function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
      board.classList.add(O_CLASS);
    } else {
      board.classList.add(X_CLASS);
    }
  }
  
  function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return cellElements[index].classList.contains(currentClass);
      });
    });
  }
});
