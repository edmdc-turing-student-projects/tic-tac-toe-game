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
    player.saveWinsToStorage();
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