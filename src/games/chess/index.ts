/// <reference path="../../../typings/tsd.d.ts"/>

import Game = require('../game');
import Board = require('./board');
import Position = require('../position');
import Player = require('../player');

class Chess extends Game {
  board: Board;
  maxPlayers = 2
  activePlayer: Player;
  
  constructor() {
    super();
    this.board = new Board(this);
    this.activePlayer = null;
  }
  
  addPlayer(player: Player) {
    super.addPlayer(player);
    
    if (this.activePlayer === null) {
      this.activePlayer = this._players.first();
    }
  }
  
  removePLayer(player: Player) {
    super.removePlayer(player);
    
    if(this._players.isEmpty()) {
      this.activePlayer = null;
    }
  }
  
  movePiece(player: Player, posFrom: Position, posTo: Position) {
    if(this.hasPlayer(player)) {
      var piece = this.board.getPieceByPosition(posFrom);
      
      if(piece !== null && piece.getPlayer() === player) {
        this.board.movePiece(piece, posTo);
      } else {
        return false;
      }
    }
  }
}

export = Chess;
