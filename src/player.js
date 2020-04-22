class Player {
  constructor (clicker) {
    this.id = clicker.id;
    this.name = clicker.name || "";
    this.token = clicker.token;
    this.tokenPlacement = {};
    this.wins = [];
    this.turn = false;
    this.isWinner = false;
  };

  saveWinsToStorage () {
    localStorage.setItem(`${this.id}`, JSON.stringify(this.wins));
  };

  retrieveWinsFromStorage() {
    this.wins = JSON.parse(localStorage.getItem(`${this.id}`));
    if (this.wins === null) {
      return this.wins = [];
    };    
  };
};
