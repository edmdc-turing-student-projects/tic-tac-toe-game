var player1 = new Player ({id:'one', token:'x'});
var player2 = new Player ({id:'two', token:'o'});

class GameBoard {
  constructor() {
    this.gameBoard = [
      {col1: '', col2: '', col3: ''},
      {col1: '', col2: '', col3: ''},
      {col1: '', col2: '', col3: ''}
    ]
  }




// Create Game Class. Pseudocode the following. It should:
// - [ ] Have two player instances
      
// - [ ] Keep track of the data for the game board
      //How do we structure that data, so that we can acces it efficiently. 
      //This is the game board, so it should be structured like a matrix.
      //I'm leaning to object with three objects
      //the first object will be three rows 
      //each row will also be an obj each property a column
      //maybe an array with three object, would still make it feasible to target specific clicks 
      //and we could use more of the array prototype methods (more familiarity)
// - [ ] Know which player's turn it is.
        //this will be a function looking for each player's turn property,
        //in donig so it will also delegate the palyer turns.  
        //This is our starting and ending point for each loop that will eventually become a players turn.

// - [ ] Check Game Board data for win conditions
        //this check is intergrated into each turn, there are a total of eight win conditions 
// - [ ] Check for Draw
        // If there are no win conditions, then.... it's a draw

// - [ ] Save the winning board to the correct player
        //if there is a winner call the save to storage method on correct player 

// - [ ] Reset after game completion to begin New Game
        //reset the game board after winner or draw. 


        // It sound like we are doing many scoped functions to accomplish this, 
        // and we are tasked with properly managin this logic and carrying it through to 
        // the end of the game. A game of four in which one conditional leads to another and 
        // hence spanning the whole gmae board. 

// What a player turn should look like 
// first, we find which player turn it is using a turn property in player class
    // default is false so default condition is both players turn is false, so we begin 
    // with player 1 (turn = true). In the end of turn we will toggle this property back to false 
    // and player2 turn property to true and vice versa on end of player2 turn, and hene turn swapping will begin.
    // I believe this will also alternate the first turn on each game, the fairer way.
// second, the player will place a marker on a specified location (a parameter of sorts for gameboard location ie. dot notation)
      // This will add their token to the location of the game board if another's player's token is not already there. 