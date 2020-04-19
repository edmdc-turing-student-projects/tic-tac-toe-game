class Player {
  constructor (clicker) {
    this.id = clicker.id;
    this.token = clicker.token;
    this.tokenPlacement = {}
    this.wins = []; // this will be instances of the game class
    this.turn = false;
  }

  decideTokenPlacement(row, column) {
    this.tokenPlacement = {
      row: row,
      column: column
    };
  };

  saveWinsToStorage () {
    localStorage.setItem('wins', JSON.stringify(this.wins));
  }

  retrieveWinsFromStorage() {
    this.wins = JSON.parse(localStorage.getItem('wins'));
  }
}


// Create Player Class: 
// - [ ] It should have the following properties: id, token, wins (an array).
// - [ ] First method should be able to save wins to storage //pseudocode 
// - [ ] Second method should retrieve wins from storage. //pseudocode