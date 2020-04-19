// Create central game board on the DOM
// Connect Game data model to the DOM

//  the main game board class name is game-board quite specific. given 
// that the main functionality is happeing here, it should be out main query selector 
// and event listener. Maybe game container is a better choice since we must also change the game title 
// Other candidates for query selectors are player info sections, really with can make do with those three.  
// The trickiest part of this page will be attaching the DOM event on the game board to
// the player funciton of deciding token placement and updating 
// our data model game  board accordingly 
// the other game landmarks, win or draw, should be a little easier to intergrate. 
// All in all, the hard part was getting the gane working

var gameContainer = document.querySelector('.game-container');
var gameBoard = new GameBoard ();

gameContainer.addEventListener('click', determineTokenPlacement);

function determineTokenPlacement(event) {
  if (event.target.innerText === '') {
    let translatedLocation = getLocation(event);
    attachTokenToPlayer(translatedLocation, player1, player2)
    renderTokenPlacement(event, player1, player2)
    gameBoard.delegateTurn(player1, player2);
    // checkForWinner()
  }
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
  if (gameBoard.endGame()) {
    console.log("WOOOHOO!!!!")
  }
}






