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
    this._players.remove(player);
  } 
}

export = Game;
