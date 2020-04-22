var gameContainer = document.querySelector('.game-container');
var playerInputForm = document.forms[0];
var reset = document.querySelector('.reset-count');
var turnDisplay = gameContainer.querySelector('.game-info');

var gameBoard = new GameBoard ();

window.onload = checkForPlayers();

playerInputForm.addEventListener('keyup', enableStartButton);
playerInputForm.addEventListener('submit', submitPlayerNames);
gameContainer.addEventListener('click', startTurnLoop);
reset.addEventListener('click', resetVictoryCount);

function checkForPlayers() {
  let retrivedPlayers = JSON.parse(localStorage.getItem('players'));
  renamePlayers(retrivedPlayers);
  if (player1.name !== "" && player2.name !== "") {
    displayFirstGame();
  };
};

function renamePlayers(playerList) {
  if (playerList) {
    player1.name = playerList[0];
    player2.name = playerList[1];
  } else {
    player1.name = "";
    player2.name = "";
  };
};

function enableStartButton() {
  if (playerInputForm[0].value !== '' && playerInputForm[1].value !== '') {
    playerInputForm[2].disabled = false;
  };
};

function submitPlayerNames(event) {
  event.preventDefault();
  player1.name = playerInputForm[0].value; 
  player2.name = playerInputForm[1].value;
  savePlayersToStorage();
  displayFirstGame();
};

function savePlayersToStorage() {
  let players = [player1.name, player2.name];
  localStorage.setItem('players', JSON.stringify(players));
};

function displayFirstGame() {
  assignNamesToPlayerColumn();
  displayGameBoard();
  displayPreviousWins();
  displayPlayerTurn();
};

function assignNamesToPlayerColumn() {
  let playerTitles = document.querySelectorAll('.player-info');
  playerTitles[0].children[0].innerText = player1.name;
  playerTitles[1].children[0].innerText = player2.name;
};

function displayGameBoard() {
  playerInputForm.classList.add('hidden');
  gameContainer.children[2].classList.remove('hidden');
  reset.classList.remove('hidden');
};

function displayPreviousWins() {
  player1.retrieveWinsFromStorage();
  renderRetrievedWins(player1);
  player2.retrieveWinsFromStorage();
  renderRetrievedWins(player2);
};

function renderRetrievedWins(player) {
  for (let i = 0; i < player.wins.length; i++) {
    let gameGrid = player.wins[i];
    attachMiniBoardToPlayer(player, gameGrid);
  };
};

function startTurnLoop(event) {
  if (event.target.innerText === '' && event.target.parentElement.classList.contains('game-board')) {
    translateLocationToPlayer(event);
    renderTokenPlacement(event, player1, player2);
    gameBoard.delegateTurn(player1, player2);
    checkResults();
  };
};

function translateLocationToPlayer (event) {
  let chosenGameBox = event.target.closest('div');
  let translatedLocation = {
    row: Number.parseInt(chosenGameBox.dataset.row), 
    column: Number.parseInt(chosenGameBox.dataset.column)
  };
  attachTokenToPlayer(translatedLocation, player1, player2);
};

function attachTokenToPlayer(translatedLocation, player1, player2) {
  (player1.turn === true) ? player1.tokenPlacement = translatedLocation :
  (player2.turn === true) ? player2.tokenPlacement = translatedLocation :
    player1.tokenPlacement = translatedLocation;
};

function renderTokenPlacement(event, player1, player2) {
  (player1.turn === true) ? renderToken(event, player1) :
  (player2.turn === true) ? renderToken(event, player2) :
    renderToken(event, player1);  
};

function renderToken(event, player) {
  let chosenGameBoardBox = event.target.closest('div');
  chosenGameBoardBox.innerText = player.token;
};

function checkResults() {
  if (gameBoard.hadDraw) {
    displayResults();
  } else if (gameBoard.hadVictory) {
    displayResults();
    checkPlayersForWin(player1, player2);
  } else {
    displayPlayerTurn();
  };
};

function displayResults () {
  if (player1.isWinner) {
    turnDisplay.innerHTML = `<h3>${player1.name} Won!</h3>`;
  } else if (player2.isWinner) {
    turnDisplay.innerHTML = `<h3>${player2.name} Won!</h3>`;
  } else if (gameBoard.hadDraw) {
    turnDisplay.innerHTML = `<h3>It'a a Draw!</h3>`;
  };
  setTimeout(resetGameBoard, 2000);
  setTimeout(displayPlayerTurn, 2000);
};
  
function checkPlayersForWin(player1, player2) {
  let gameGrid = gameBoard.game;
  if (player1.isWinner) {
    attachMiniBoardToPlayer(player1, gameGrid);
    player1.isWinner = false;
  } else if (player2.isWinner) {
    attachMiniBoardToPlayer(player2, gameGrid);
    player2.isWinner = false;
  };
};

function attachMiniBoardToPlayer(player, gameGrid) {
  let winningPlayerStats = document.getElementById(player.id);
  let playerVictoryColumn = winningPlayerStats.querySelector('.player-victories');
  createMiniBoard(playerVictoryColumn, gameGrid);
  updatePlayerWinCount(player, winningPlayerStats);
};

function createMiniBoard(playerVictoryColumn, gameGrid) {
  let miniBoard = document.createElement('div');
  miniBoard.classList.add('mini-board');
  renderMiniBoard(miniBoard, gameGrid);
  playerVictoryColumn.appendChild(miniBoard);
};

function renderMiniBoard(miniBoard, gameGrid) {
  for (let i = 0; i < 3; i++) {
    let rows = gameGrid[i];
    renderMiniBoardRows(rows, miniBoard);
  };
};

function renderMiniBoardRows(rows, miniBoard) {
  for (let i = 0; i < 3; i++) {
    let miniToken = document.createElement('div');
    miniToken.innerText = rows[i];
    miniBoard.appendChild(miniToken);
  };
};

function updatePlayerWinCount(player, winningPlayerStats) {
  let winCount = winningPlayerStats.querySelector('.player-info h5');
  winCount.innerText = `${player.wins.length} wins!`;
};

function displayPlayerTurn() {
  (player1.turn) ? turnDisplay.innerHTML = `<h3>It's ${player1.name}'s turn!</h3>`
  : (player2.turn) ? turnDisplay.innerHTML = `<h3>It's ${player2.name}'s turn!</h3>`
  : turnDisplay.innerHTML = `<h3>It's ${player1.name}'s turn!</h3>`;
};

function resetGameBoard () {
  if (gameBoard.hadVictory || gameBoard.hadDraw) {
    let gameField = document.querySelector('.game-board');
    for (let i = 0; i < gameField.children.length; i++) {
      gameField.children[i].innerText = "";
    };
    gameBoard.endGame();
  };
};

function resetVictoryCount() {
  localStorage.clear();
  location.reload();
};

