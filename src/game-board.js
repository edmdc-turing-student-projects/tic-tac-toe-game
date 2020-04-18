var player1 = new Player ({id:'one', token:'x'});
var player2 = new Player ({id:'two', token:'o'});

class GameBoard {
  constructor() {
    this.gameBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  }

  delegateTurn(player1, player2) {
    if (player1.turn === false && player2.turn === false) {
      player1.turn = true;
      this.delegateTurn(player1, player2);
    } else if (player1.turn === true) {
      this.startTurn(player1, player2);
    } else if (player2.turn === true) {
      this.startTurn(player2, player1);
    };
  };

  startTurn(player, otherPlayer) {
    this.placePlayerToken(player);
    this.checkForWins(player);
    this.endTurn(player, otherPlayer);
  }

  placePlayerToken(player) {
    let row = player.tokenPlacement.row;
    let column = player.tokenPlacement.column;
    if (this.gameBoard[row][column] === null) {
      this.gameBoard[row][column] = player.token;
    };
    // checkForWin(player);
  };

  checkForWins(player) {
    this.checkAllRows(player);
    this.getCenterColumn(player); 
    this.checkCenterPiece(player);
  }


  checkAllRows(player) {
    for (let i = 0; i < 3; i++) {
      let row = this.gameBoard[i];
      let rowCheck = row.filter(function(tokenSpot) {
        return tokenSpot === player.token});
      if (rowCheck.length === 3) {
        this.claimWin(player);
      };
    };
  };

  checkCenterColumn(player, column) {
    let filteredColumns = column.filter( row => row === player.token);
    if (filteredColumns.length === 3) {
      this.claimWin(player)
    }
  }

  getCenterColumn(player) {
    let columns = []
    for (let i = 0; i < 3; i++) {
      columns.push(`${this.gameBoard[i][1]}`)
    }
    this.checkCenterColumn(player, columns)
  }

  checkCenterPiece(player) {
    if (this.gameBoard[1][1] === player.token) {
      this.checkDiagonals(player);
    }
  }

  checkDiagonals(player) {
    if (this.gameBoard[1][1] === this.gameBoard[0][2] 
      && this.gameBoard[0][2] === this.gameBoard[2][0]) {
        this.claimWin(player);
    } else if (this.gameBoard[1][1] === this.gameBoard[2][2] 
      && this.gameBoard[2][2] === this.gameBoard[0][0]) {
        this.claimWin(player);
    } 
  }
   
  claimWin(player) {
    player.wins.push(this.gameBoard);
   console.log(`Woohoo!`);
  }

  endTurn(player, otherPlayer) {
    player.turn = false;
    otherPlayer.turn = true;
  }
};

  




//* // Create Game Class. Pseudocode the following. It should:
// - [ ] Have two player instances
      
// - [ ] Keep track of the data for the game board
      //How do we structure that data, so that we can acces it efficiently. 
      //This is the game board, so it should be structured like a matrix.
      //I'm leaning to object with three objects
      //the first object will be three rows 
      //each row will also be an obj each property a column
      //maybe an array with three object, would still make it feasible to target specific clicks 
      //and we could use more of the array prototype methods (more familiarity)
      //or better yet nested array, we can define the length, and hence location by passing in null
      // purpuseful abscences!!!  
// - [ ] Know which player's turn it is.
        //this will be a function looking for each player's turn property,
        //in donig so it will also delegate the palyer turns.  
        //This is our starting and ending point for each loop that will eventually become a players turn.

// - [ ] Check Game Board data for win conditions
        //this check is intergrated into each turn, there are a total of eight win conditions 
// - [ ] Check for Draw
        // If there are no win conditions, then.... it's a draw
        //This in a way is intergrating and recognizing all the logical dead end 
        //trickier than first thought

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
//Third, the fun begins, we must begin iterating through all the win conditions in a logical way, lagical in an efficient kind of way.
      // this may be the ventual flow:
      // It begins with the first row and col 
      // if first two col values equal one another check last col value for a win()
            //if false invoke check on row 2 
                // return true for a win with matching value on row 3 and row 1 (for backward compability)
                // if false check for 
      
      // if first value equals value in row 2 col *//