var gameContainer = document.querySelector('.game-container');
var playerInputForm = document.forms[0];
var reset = document.querySelector('.reset-count');

var gameBoard = new GameBoard ();
window.onload = checkForPlayers();

playerInputForm.addEventListener('keyup', enableStartButton);
playerInputForm.addEventListener('submit', submitPlayerNames);
gameContainer.addEventListener('click', determineTokenPlacement);
reset.addEventListener('click', resetVictoryCount)

function checkForPlayers() {
  let retrivedPlayers = JSON.parse(localStorage.getItem('players'))
  player1.name = retrivedPlayers[0];
  player2.name = retrivedPlayers[1];
  if (player1.name !== "" && player2.name !== "") {
    startGame();
  }
}

function enableStartButton() {
  if (playerInputForm[0].value !== '' && playerInputForm[1].value !== '') {
    playerInputForm[2].disabled = false;
 }
}

function submitPlayerNames() {
  player1.name = playerInputForm[0].value; 
  player2.name = playerInputForm[1].value;
  savePlayersToStorage();
  startGame();
  // event.preventDefault();
}

function savePlayersToStorage() {
  let players = [player1.name, player2.name];
  localStorage.setItem('players', JSON.stringify(players))
}

function startGame() {
  assignNamesToPlayerColumn();
  displayGameBoard();
  displayPreviousWins();
  displayPlayerTurn();
  // event.preventDefault();
}

function assignNamesToPlayerColumn() {
  let playerTitles = document.querySelectorAll('.player-info')
  playerTitles[0].children[0].innerText = player1.name;
  playerTitles[1].children[0].innerText = player2.name;
}

function displayGameBoard() {
  playerInputForm.classList.add('hidden');
  gameContainer.children[2].classList.remove('hidden');
  reset.classList.remove('hidden');
}

function displayPreviousWins() {
  player1.retrieveWinsFromStorage();
  renderRetrievedWins(player1);
  playerTwoClone = player2.retrieveWinsFromStorage();
  renderRetrievedWins(player2);
}

function renderRetrievedWins(player) {
  for (let i = 0; i < player.wins.length; i++) {
    let gameGrid = player.wins[i]
    attachMiniBoardToPlayer(player, gameGrid)
  }
}

function displayPlayerTurn() {
  let turnDisplay = gameContainer.querySelector('.game-info');
  (player1.turn === true) ? turnDisplay.innerHTML = `<h3>It's ${player1.name}'s turn!</h3>`
  : (player2.turn === true) ? turnDisplay.innerHTML = `<h3>It's ${player2.name}'s turn!</h3>`
  : turnDisplay.innerHTML = `<h3>It's ${player1.name}'s turn!</h3>`
}

function determineTokenPlacement(event) {
  if (event.target.innerText === '' && event.path[1].classList.contains('game-board')) {
    let translatedLocation = getLocation(event);
    attachTokenToPlayer(translatedLocation, player1, player2)
    renderTokenPlacement(event, player1, player2)
    gameBoard.delegateTurn(player1, player2);
    displayPlayerTurn();
  }
  checkForWinner();
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
  let gameGrid = gameBoard.gameBoard;
  if (player1.isWinner) {
    attachMiniBoardToPlayer(player1, gameGrid);
    player1.isWinner = false;
  } else if (player2.isWinner) {
    attachMiniBoardToPlayer(player2, gameGrid);
    player2.isWinner = false;
  }
}

function attachMiniBoardToPlayer(player, gameGrid) {
  let winningPlayerStats = document.getElementById(player.id)
  let playerVictoryColumn = winningPlayerStats.querySelector('.player-victories')
  createMiniBoard(playerVictoryColumn, gameGrid)
  updatePlayerWinCount(player, winningPlayerStats);
}

function createMiniBoard(playerVictoryColumn, gameGrid) {
  let miniBoard = document.createElement('div');
  miniBoard.classList.add('mini-board');
  renderMiniBoard(miniBoard, gameGrid)
  playerVictoryColumn.appendChild(miniBoard);
}

function renderMiniBoard(miniBoard, gameGrid) {
  for (let i = 0; i < 3; i++) {
    let rows = gameGrid[i];
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

function resetVictoryCount() {
  localStorage.clear();

}


