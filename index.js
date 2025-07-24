const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetBtn = document.getElementById('resetBtn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function handleCellClick(e) {
  const index = [...cells].indexOf(e.target);

  if (board[index] !== '' || isGameOver) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer);

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} wins! 🎉`;
    document.querySelector('.board').classList.add('over');
    isGameOver = true;
    return;
  }

  if (!board.includes('')) {
    statusText.textContent = "It's a draw 🤝";
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `${currentPlayer === 'X' ? 'Your' : "Computer"} turn (${currentPlayer})`;

  if (currentPlayer === 'O') {
    setTimeout(computerMove, 500);
  }
}

function checkWinner() {
  return winConditions.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

function computerMove() {
  let emptyCells = board.map((val, i) => val === '' ? i : null).filter(i => i !== null);
  if (emptyCells.length === 0 || isGameOver) return;

  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomIndex] = 'O';
  cells[randomIndex].textContent = 'O';
  cells[randomIndex].classList.add('O');

  if (checkWinner()) {
    statusText.textContent = `Computer wins! 🤖`;
    document.querySelector('.board').classList.add('over');
    isGameOver = true;
    return;
  }

  if (!board.includes('')) {
    statusText.textContent = "It's a draw 🤝";
    isGameOver = true;
    return;
  }

  currentPlayer = 'X';
  statusText.textContent = "Your turn (X)";
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameOver = false;
  statusText.textContent = "Your turn (X)";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });
  document.querySelector('.board').classList.remove('over');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
