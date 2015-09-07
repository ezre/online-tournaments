/// <reference path="../../../typings/tsd.d.ts"/>

import Game     = require('../game');
import Board    = require('./board');
import Position = require('../position');
import Player   = require('../player');
import Piece    = require('./pieces/piece');
import King     = require('./pieces/king');
import Rook     = require('./pieces/rook');

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
    
    return this;
  }
  
  removePlayer(player: Player) {
    super.removePlayer(player);
    
    if(this._players.isEmpty()) {
      this.activePlayer = null;
    }
  }
  
  movePiece(player: Player, posFrom: Position, posTo: Position) {
    if (this.hasPlayer(player)) {
      var piece = this.board.getPieceByPosition(posFrom);
      if (piece !== null && piece.getPlayer() === player) {
        var pieceTo = this.board.getPieceByPosition(posTo);
        if (pieceTo === null) {
          this.board.movePiece(piece, posTo);
        } else {
          if (pieceTo.player === player) {
            this.isCastling(player, piece, pieceTo);
          }
        }
      } else {
        return false;
      }
    }
  }
  
  isCastling(player: Player, pieceMoved: Piece, pieceTo: Piece) {
    if (pieceMoved.hasMoved === false && pieceTo.hasMoved === false &&
    ((pieceMoved instanceof King && pieceTo instanceof Rook) ||
    (pieceTo instanceof King || pieceMoved instanceof Rook)) &&
    /* @todo Check if all fields between are empty */) {
      
    }
  }
}

export = Chess;
