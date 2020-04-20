var player1 = new Player ({id:'player1', token:'x'});
var player2 = new Player ({id:'player2', token:'o'});

class GameBoard {
  constructor() {
    this.gameBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    this.turnLoop = 0;
    this.hadDraw = false;
    this.hadVictory = false;
  }

  startGame(player1, player2) {
    player1.turn = true;
    this.startTurn(player1, player2);
  }
  

  delegateTurn(player1, player2) {
    (player1.turn === true) ? this.startTurn(player1, player2) :
    (player2.turn === true) ? this.startTurn(player2, player1) :
    this.startGame(player1, player2);
  };

  startTurn(player, otherPlayer) {
    this.placePlayerToken(player);
    this.checkForWins(player);
    this.checkForDraw();
    this.endTurn(player, otherPlayer);
  }

  placePlayerToken(player) {
    let row = player.tokenPlacement.row;
    let column = player.tokenPlacement.column;
    if (this.gameBoard[row][column] === null) {
      this.gameBoard[row][column] = player.token;
    };
  };

  checkForWins(player) {
    this.checkAllRows(player);
    this.accessAllColumns(player); 
    this.checkCenterPiece(player);
  };


  checkAllRows(player) {
    for (let i = 0; i < 3; i++) {
      let row = this.gameBoard[i];
      let rowCheck = row.filter(function(tokenSpot) {
        return tokenSpot === player.token});
      if (rowCheck.length === 3) {
        this.claimWin(player) 
      };
    };
  }
  
  accessAllColumns(player) {
    let columnIndexNumbers = [0, 1, 2];
    columnIndexNumbers.forEach( columnIndex => 
      this.getSingleColumn(player, columnIndex));
  };

  getSingleColumn(player, columnNumber) {
    let column = []
    for (let i = 0; i < 3; i++) {
      column.push(`${this.gameBoard[i][columnNumber]}`)
    };
    this.checkColumn(player, column)
  };

  checkColumn(player, column) {
    let filteredColumns = column.filter(row => row === player.token);
    if (filteredColumns.length === 3) {
      this.claimWin(player) 
    };
  };
  

  checkCenterPiece(player) {
    if (this.gameBoard[1][1] === player.token) {
      this.checkDiagonals(player);
    };
  };

  checkDiagonals(player) {
    if (this.gameBoard[1][1] === this.gameBoard[0][2] 
      && this.gameBoard[1][1] === this.gameBoard[2][0]) {
        this.claimWin(player);
    } else if (this.gameBoard[1][1] === this.gameBoard[2][2] 
      && this.gameBoard[1][1] === this.gameBoard[0][0]) {
        this.claimWin(player) 
    }
  };

  checkForDraw() {
   if (this.turnLoop === 8 && this.hadVictory === false) {
     this.hadDraw = true;
     alert("It's a Draw :(")
   }
  }
  
  endTurn(player, otherPlayer) {
    this.turnLoop++
    player.turn = false;
    otherPlayer.turn = true;
  };

  claimWin(player) {
    player.wins.push(this.gameBoard);
    player.isWinner = true;
    this.hadVictory = true;
  };

  endGame() {
    this.gameBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
    this.turnLoop = 0;
    this.hadDraw = false;
    this.hadVictory = false;
  }
};

// - [ ] Check for Draw
        // If there are no win conditions, then.... it's a draw
        //This in a way is intergrating and recognizing all the logical dead end 
        //trickier than first thought
        //What does a draw mean...
        //There have been nine turns total
        //none of our checks passed
        //... but they also don't pass until there is a winner 
        // so if we keep a counter of times that our row, column and loop run to completion without succes then 
        // we can add a condition that will register the draw based on times test failed, since there is only
        // a set of turns per game. If this conditons is met we can lof the draw, and reset the game again.



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