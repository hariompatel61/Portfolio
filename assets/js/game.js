document.addEventListener('DOMContentLoaded', () => {
  const X_CLASS = 'x';
  const O_CLASS = 'o';
  const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  
  const cellElements = document.querySelectorAll('[data-cell]');
  const board = document.getElementById('game-board');
  const currentPlayerElement = document.getElementById('current-player');
  const gameMessageElement = document.getElementById('game-message');
  const restartButton = document.getElementById('restart-button');
  const xScoreElement = document.getElementById('x-score');
  const oScoreElement = document.getElementById('o-score');
  const tiesScoreElement = document.getElementById('ties-score');
  
  let oTurn;
  let xScore = 0;
  let oScore = 0;
  let ties = 0;
  
  startGame();
  
  restartButton.addEventListener('click', startGame);
  
  function startGame() {
    oTurn = false;
    currentPlayerElement.textContent = 'X';
    currentPlayerElement.style.color = 'var(--vivid-sky-blue)';
    gameMessageElement.textContent = '';
    
    cellElements.forEach(cell => {
      cell.classList.remove(X_CLASS);
      cell.classList.remove(O_CLASS);
      cell.innerHTML = '';
      cell.removeEventListener('click', handleClick);
      cell.addEventListener('click', handleClick, { once: true });
    });
    
    setBoardHoverClass();
  }
  
  function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    
    placeMark(cell, currentClass);
    
    if (checkWin(currentClass)) {
      endGame(false, currentClass);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
      setBoardHoverClass();
      updateCurrentPlayerDisplay();
    }
  }
  
  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    const iconName = currentClass === X_CLASS ? 'close-outline' : 'ellipse-outline';
    cell.innerHTML = `<ion-icon name="${iconName}"></ion-icon>`;
  }
  
  function swapTurns() {
    oTurn = !oTurn;
  }
  
  function updateCurrentPlayerDisplay() {
    currentPlayerElement.textContent = oTurn ? 'O' : 'X';
    currentPlayerElement.style.color = oTurn ? 'var(--fiery-rose)' : 'var(--vivid-sky-blue)';
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
  
  function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
  }
  
  function endGame(draw, winner) {
    if (draw) {
      gameMessageElement.textContent = 'Game ended in a draw!';
      ties++;
      tiesScoreElement.textContent = ties;
    } else {
      const winnerText = winner === X_CLASS ? 'X' : 'O';
      gameMessageElement.textContent = `${winnerText} Wins!`;
      gameMessageElement.style.color = winner === X_CLASS ? 'var(--vivid-sky-blue)' : 'var(--fiery-rose)';
      
      if (winner === X_CLASS) {
        xScore++;
        xScoreElement.textContent = xScore;
      } else {
        oScore++;
        oScoreElement.textContent = oScore;
      }
    }
    
    // Disable further clicks
    cellElements.forEach(cell => {
      cell.removeEventListener('click', handleClick);
    });
  }
  
  // Save scores to localStorage
  function saveScores() {
    localStorage.setItem('ticTacToeScores', JSON.stringify({
      xScore,
      oScore,
      ties
    }));
  }
  
  // Load scores from localStorage
  function loadScores() {
    const scores = JSON.parse(localStorage.getItem('ticTacToeScores'));
    if (scores) {
      xScore = scores.xScore || 0;
      oScore = scores.oScore || 0;
      ties = scores.ties || 0;
      
      xScoreElement.textContent = xScore;
      oScoreElement.textContent = oScore;
      tiesScoreElement.textContent = ties;
    }
  }
  
  // Initialize by loading scores
  loadScores();
});
