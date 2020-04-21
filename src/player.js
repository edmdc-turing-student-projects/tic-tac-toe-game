class Player {
  constructor (clicker) {
    this.id = clicker.id;
    this.name = clicker.name;
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
    localStorage.setItem(`${this.id}`, JSON.stringify(this.wins));
  }

  retrieveWinsFromStorage() {
    this.wins = JSON.parse(localStorage.getItem(`${this.id}`));
    if (this.wins === null) {
      return this.wins = [];
    }    
  }
}



// Create Player Class: 
// - [ ] It should have the following properties: id, token, wins (an array).
// - [ ] First method should be able to save wins to storage //pseudocode 
// - [ ] Second method should retrieve wins from storage. //pseudocode