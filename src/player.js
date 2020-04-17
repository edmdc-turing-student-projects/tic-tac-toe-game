class Player {
  constructor (clicker) {
    this.id = clicker.id;
    this.token = clicker.token;
    this.wins = []; // this will be instances of the game class
    this.turn = clicker.turn || false;
  }

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