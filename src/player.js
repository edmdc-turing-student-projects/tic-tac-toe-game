class Player {
  constructor (clicker) {
    this.id = clicker.id;
    this.name = clicker.name || "";
    this.token = clicker.token;
    this.tokenPlacement = {};
    this.wins = [];
    this.turn = false;
    this.isWinner = false;
  }

  decideTokenPlacement(location) {
    this.tokenPlacement = {
      row: location.row,
      column: location.column
    };
  };

  saveWinsToStorage () {
    localStorage.setItem(`${this.name}`, JSON.stringify(Player));
  }

  retrieveWinsFromStorage() {
    this.wins = JSON.parse(localStorage.getItem(`${this.name}`));
  }
}


// Create Player Class: 
// - [ ] It should have the following properties: id, token, wins (an array).
// - [ ] First method should be able to save wins to storage //pseudocode 
// - [ ] Second method should retrieve wins from storage. //pseudocode