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


gameContainer.addEventListener('click', choseTokenSpot)

function choseTokenSpot() {
  let chosenTokenSpot = event.target.closest('div')
  let spotLegend = [
    {row: 0 , column: 0},
    {row: 0 , column: 1},
    {row: 0 , column: 2},
    {row: 1 , column: 0},
    {row: 1 , column: 1},
    {row: 1 , column: 2},
    {row: 2 , column: 0},
    {row: 2 , column: 1},
    {row: 2 , column: 2},
  ]
  determineTokenSpot(chosenTokenSpot.id, spotLegend)
}

function determineTokenSpot(chosenTokenSpot, spotLegend) {
  let spot = spotLegend[chosenTokenSpot]
  determinePlayerTurn(spot)
}

function determinePlayerTurn(spot) {
  console.log(player1)
  console.log(player2)
  console.log(gameBoard.gameBoard)
  if (player1.turn === true) {
    player1.decideTokenPlacement(spot);
    gameBoard.delegateTurn(player1, player2);
  } else if (player2.turn === true) {
    player2.decideTokenPlacement(spot);
    gameBoard.delegateTurn(player1, player2);
  } else {
    player1.decideTokenPlacement(spot)
    gameBoard.startGame(player1, player2)
  }
};



