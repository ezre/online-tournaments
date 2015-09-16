import Player   = require('./player');
import ExArray  = require('../utils/exArray'); 

class Game {
  id: number;
  createdAt: Date;
  protected _players: ExArray;
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
  
  hasPlayer(player: Player) {
    return this._players.has(player);
  }
  
  getFirstPlayer() {
    return this._players.first();
  }
  
  getLastPlayer() {
    return this._players.last();
  }
  
  getPlayers() {
    return this._players;
  }
  
  getFirstOpponent(currentPlayer: Player) {
    var playerIdx, player, currentPlayerIdx;
    
    if(this._players.length() < 2) {
      return null;
    }
    
    currentPlayerIdx = this._players.indexOf(currentPlayer);
    
    for(playerIdx in this._players) {
      if(playerIdx !== currentPlayerIdx) {
        return this._players.get(playerIdx);
      }
    }
    
    return null;
  }
}

export = Game;
