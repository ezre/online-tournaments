/// <reference path="../../../typings/tsd.d.ts"/>

import Game = require('../game');
import Board = require('./board');
import Position = require('../position');
import Player = require('../player');

class Chess extends Game {
  board: Board;
  maxPlayers = 2
  
  constructor() {
    super();
    this.board = new Board(this);
  }
  
  movePiece(player: Player, posFrom: Position, posTo: Position) {
    if(this.hasPlayer(player)) {
      var piece = this.board.getPieceByPosition(posFrom);
      
      if(piece !== null && piece.getPlayer() === player) {
        this.board.movePiece(piece, posTo);
      }
    }
  }
}

export = Chess;
