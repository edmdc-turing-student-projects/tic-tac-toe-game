var gameContainer = document.querySelector('.game-container');

var gameBoard = new GameBoard ();

gameContainer.addEventListener('click', determineTokenPlacement);

function determineTokenPlacement(event) {
  if (event.target.innerText === '') {
    let translatedLocation = getLocation(event);
    attachTokenToPlayer(translatedLocation, player1, player2)
    renderTokenPlacement(event, player1, player2)
    gameBoard.delegateTurn(player1, player2);
  }
  checkForWinner()
}

function getLocation (event) {
  let chosenGameBoardBox = event.target.closest('div')
  let gameBoardLocation = {
    row: Number.parseInt(chosenGameBoardBox.dataset.row), 
    column: Number.parseInt(chosenGameBoardBox.dataset.column)
  };
  return gameBoardLocation
}

function attachTokenToPlayer(translatedLocation, player1, player2) {
  (player1.turn === true) ? player1.tokenPlacement = translatedLocation :
  (player2.turn === true) ? player2.tokenPlacement = translatedLocation :
    player1.tokenPlacement = translatedLocation
}

function renderTokenPlacement(event, player1, player2) {
  (player1.turn === true) ? renderToken(event, player1) :
  (player2.turn === true) ? renderToken(event, player2) :
    renderToken(event, player1);  
}

function renderToken(event, player) {
  let chosenGameBoardBox = event.target.closest('div');
  chosenGameBoardBox.innerText = player.token;
}

function checkForWinner() {
  if (gameBoard.hadDraw) {
    resetGameBoard();
  } else if (gameBoard.hadVictory) {
    checkPlayersForWin(player1, player2);
    resetGameBoard();
  }
}

function resetGameBoard () {
  let gameField = document.querySelector('.game-board');
  for (let i = 0; i < gameField.children.length; i++) {
    gameField.children[i].innerText = "";
  }
  gameBoard.endGame();
} 
  
function checkPlayersForWin(player1, player2) {
  if (player1.isWinner) {
    attachMiniBoardToPlayer(player1);
    player1.isWinner = false;
  } else if (player2.isWinner) {
    attachMiniBoardToPlayer(player2);
    player2.isWinner = false;
  }
}

function attachMiniBoardToPlayer(player) {
  let winningPlayerStats = document.getElementById(player.id)
  let playerVictoryColumn = winningPlayerStats.querySelector('.player-victories')
  createMiniBoard(playerVictoryColumn)
  updatePlayerWinCount(player, winningPlayerStats);
}

function createMiniBoard(playerVictoryColumn) {
  let miniBoard = document.createElement('div');
  miniBoard.classList.add('mini-board');
  renderMiniBoard(miniBoard)
  playerVictoryColumn.appendChild(miniBoard);
}

function renderMiniBoard(miniBoard) {
  for (let i = 0; i < 3; i++) {
    let rows = gameBoard.gameBoard[i];
    renderMiniBoardRows(rows, miniBoard);
  }
}

function renderMiniBoardRows(rows, miniBoard) {
  for (let i = 0; i < 3; i++) {
    let miniToken = document.createElement('div');
    miniToken.innerText = rows[i];
    miniBoard.appendChild(miniToken);
  }
}

function updatePlayerWinCount(player, winningPlayerStats) {
  let winCount = winningPlayerStats.querySelector('.player-info h5')
  winCount.innerText = `${player.wins.length} wins!`
}