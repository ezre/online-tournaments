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
          if (piece instanceof King && Math.abs(posFrom.x - posTo.x) === 2 &&
          posFrom.y === posTo.y) {
            this.doCastling(player, piece, posTo);
          } else {
            this.board.movePiece(piece, posTo);
          }
        }
      } else {
        return false;
      }
    }
  }
  
  doCastling(player: Player, king: King, posTo: Position) {
    var isFieldsBetweenEmpty,
        isKingCastlingAllowed,
        rook,
        direction,
        rookPosX,
        castlingResult = false;
    
    direction = king.position.x > posTo.x ? -1 : 1;
    rookPosX  = direction === -1 ? 0 : Board.size.x - 1;
    rook      = this.board.getPieceByPosition({ x: rookPosX, y: posTo.y });
    
    if (king.canDoCasting() &&
    rook !== null &&
    rook.hasMoved === false &&
    this.board.areFieldsEmpty(
      { x: king.position.x + direction, y: posTo.y },
      { x: rook.position.x - direction, y: posTo.y }
    ) &&
    !king.isInCheck()) {
      this.board.movePiece(king, { 
        x: king.position.x + 2 * direction,
        y: posTo.y }
      );
      this.board.movePiece(rook, {
        x: king.position.x - direction,
        y: posTo.y
      });
      king.hasDoneCastling  = true;
      castlingResult        = true;
    }
    
    return castlingResult;
  }
}

export = Chess;
