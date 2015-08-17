class Game {
  id: number;
  createdAt: Date;
  
  constructor() {
    this.id         = 1; // @TODO: generate a random number here
    this.createdAt  = new Date();
  }
}

export = Game;
