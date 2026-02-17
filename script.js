
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const placeMark = (place, mark) => {
    if (board[place] === "") {
      board[place] = mark;
      return true;
    }
    return false;
  }

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  }

  return { getBoard, placeMark, resetBoard }
})();

//////////////////////////////////

const Player = (name, mark) => {
  const getMark = () => mark;
  const getName = () => name;
  return { getMark, getName }
}

////////////////////////////////////

const gameController = (() => {
  const p1 = Player('Edgar', 'O')
  const p2 = Player('Ivan', 'X')
  let gameOver = false;
  let activePlayer = p1;

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  const board = gameBoard.getBoard();

  const isWinner = () => {
    const board = gameBoard.getBoard();
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        gameOver = true;
        alert(activePlayer.getName())
        return true;
      }
    }
    return false;
  }

  const playTurn = (index) => {
    if (gameOver) return;

    if (gameBoard.placeMark(index, activePlayer.getMark())) {
      gameDisplay.renderBoard();
      if (!isWinner()) {
        switchPlayer()
      }
    } else {
      alert('Invalid')
    }
  }

  const switchPlayer = () => {
    activePlayer = activePlayer.getName() === "Edgar" ? p2 : p1;
  }

  const startGame = () => {
    gameBoard.resetBoard();
    gameDisplay.renderBoard();
  }

  return { playTurn, startGame }
})();

////////////////////////////////////////////////

const gameDisplay = (() => {
  const gameBoardElem = document.querySelector(".game-container");

  const renderBoard = () => {
    gameBoardElem.innerHTML = ""
    const board = gameBoard.getBoard()
    board.forEach((mark, index) => {
      const markElem = document.createElement('div');
      markElem.classList.add('mark');
      markElem.dataset.markIndex = index;
      markElem.textContent = mark;
      markElem.addEventListener('click', markClick);
      gameBoardElem.appendChild(markElem);
    })
  }

  const markClick = (e) => {
    const index = e.target.dataset.markIndex;
    gameController.playTurn(index)
  }

  return { renderBoard }

})();

gameController.startGame();




