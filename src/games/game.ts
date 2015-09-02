import Player   = require('./player');
import ExArray  = require('../utils/exArray'); 

class Game {
  id: number;
  createdAt: Date;
  private _players: ExArray;
  maxPlayers: number;
  
  constructor() {
    this.id         = 1; // @TODO: generate a random number here
    this.createdAt  = new Date();
    this._players   = new ExArray();
  }
  
  addPlayer(player: Player) {
    this._players.add(player);
    
    return this;
  }
  
  removePlayer(player: Player) {
    var idx = this._players.indexOf(player);
    
    if (idx > -1) {
      this._players.slice(idx, 1);
    }
  } 
}

export = Game;
