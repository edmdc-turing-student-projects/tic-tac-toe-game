var player1 = new Player ({id:'player1', token:'x'});
var player2 = new Player ({id:'player2', token:'o'});

class GameBoard {
  constructor() {
    this.game = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    this.turnLoop = 0;
    this.hadDraw = false;
    this.hadVictory = false;
  };

  startGame(player1, player2) {
    player1.turn = true;
    this.startTurn(player1, player2);
  };
  
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
  };

  placePlayerToken(player) {
    let row = player.tokenPlacement.row;
    let column = player.tokenPlacement.column;
    if (this.game[row][column] === null) {
      this.game[row][column] = player.token;
    };
  };

  checkForWins(player) {
    this.accessAllRows(player);
    this.accessAllColumns(player); 
    this.checkCenterPiece(player);
  };

  accessAllRows(player) {
    for (let i = 0; i < 3; i++) {
      let row = this.game[i];
      this.checkRow(player, row);
    };
  };

  checkRow(player, row) {
    let rowCheck = row.filter(function(tokenSpot) {
      return tokenSpot === player.token});
    if (rowCheck.length === 3) {
      this.claimWin(player);
    };
  }; 
  
  accessAllColumns(player) {
    let columnSequence = [0, 1, 2];
    columnSequence.forEach( columnNumber => 
      this.getSingleColumn(player, columnNumber));
  };

  getSingleColumn(player, columnNumber) {
    let column = [];
    for (let i = 0; i < 3; i++) {
      column.push(`${this.game[i][columnNumber]}`)
    };
    this.checkColumn(player, column);
  };

  checkColumn(player, column) {
    let filteredColumns = column.filter(function(tokenSpot) {
      return tokenSpot === player.token});
    if (filteredColumns.length === 3) {
      this.claimWin(player); 
    };
  };
  
  checkCenterPiece(player) {
    if (this.game[1][1] === player.token) {
      this.checkDiagonals(player);
    };
  };

  checkDiagonals(player) {
    if (this.game[1][1] === this.game[0][2] 
      && this.game[1][1] === this.game[2][0]) {
        this.claimWin(player);
    } else if (this.game[1][1] === this.game[2][2] 
      && this.game[1][1] === this.game[0][0]) {
        this.claimWin(player); 
    };
  };

  checkForDraw() {
   if (this.turnLoop === 8 && this.hadVictory === false) {
     this.hadDraw = true;
   };
  };
  
  endTurn(player, otherPlayer) {
    this.turnLoop++;
    player.turn = false;
    otherPlayer.turn = true;
  };

  claimWin(player) {
    player.wins.push(this.game);
    player.isWinner = true;
    player.saveWinsToStorage();
    this.hadVictory = true;
  };

  endGame() {
    this.game = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    this.turnLoop = 0;
    this.hadDraw = false;
    this.hadVictory = false;
  };
};