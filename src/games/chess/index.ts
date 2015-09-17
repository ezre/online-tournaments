/// <reference path="../../../typings/tsd.d.ts"/>

import Game         = require('../game');
import Board        = require('./board');
import Position     = require('../position');
import ChessPlayer  = require('./chessPlayer');
import Piece        = require('./pieces/piece');
import King         = require('./pieces/king');
import Rook         = require('./pieces/rook');
import Pawn         = require('./pieces/pawn');
import Direction    = require('./direction');

class Chess extends Game {
  board: Board;
  maxPlayers = 2
  activePlayer: ChessPlayer;
  
  constructor() {
    super();
    this.board = new Board(this);
    this.activePlayer = null;
  }
  
  addPlayer(player: ChessPlayer) {
    if (this._players.length() <= Chess.maxPlayers) {
      super.addPlayer(player);
      
      if (this._players.length() === 1) {
        this._players.first().direction = Direction.Up;
      } else {
        this._players.last().direction = Direction.Down;
      }
      
      if (this.activePlayer === null) {
        this.activePlayer = this._players.first();
      }
    }
    
    return this;
  }
  
  removePlayer(player: ChessPlayer) {
    super.removePlayer(player);
    
    if(this._players.isEmpty()) {
      this.activePlayer = null;
    }
  }
  
  isDoingEnPassant(posFrom: Position, posTo: Position) {
    return (Math.abs(posFrom.x - posTo.x) == 1 &&
    Math.abs(posFrom.y - posTo.y) == 1);
  }
  
  doCastling(player: ChessPlayer, king: King, posTo: Position) {
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
  
  getEnPassantPiece(pawn: Pawn) {
    var nearPiece = this.board.getPieceByPosition({ 
      x: pawn.position.x + 1,
      y: pawn.position.y
    }) || this.board.getPieceByPosition({
      x: pawn.position.x - 1,
      y: pawn.position.y
    });
    
    if (nearPiece !== null &&
    nearPiece.player !== pawn.player &&
    nearPiece instanceof Pawn &&
    nearPiece.isTwoRanksForward) {
      return nearPiece;
    } else {
      return;
    }
  }
  
  movePiece(player: ChessPlayer, posFrom: Position, posTo: Position) {
    var hasMoved = false;
    
    if (this.hasPlayer(player)) {
      var piece = this.board.getPieceByPosition(posFrom);
      if (piece !== null && piece.getPlayer() === player) {
        var pieceTo = this.board.getPieceByPosition(posTo);
        if (pieceTo === null) {
          if (piece instanceof King &&
          Math.abs(posFrom.x - posTo.x) === 2 &&
          posFrom.y === posTo.y) {
            this.doCastling(player, piece, posTo);
          } else {
            // @todo Should also check enpassant move
            // valitity in here
            if (piece instanceof Pawn &&
            this.isDoingEnPassant(posFrom, posTo) &&
            this.getEnPassantPiece(piece) != null) {
              var opponentPiece = this.getEnPassantPiece(piece);
              this.board.removePiece(opponentPiece);
              // @todo move piece appropriately
              piece.position.x = opponentPiece.position.x; 
              hasMoved = true;
            }
            if (piece.validateMove(posTo)) {
              this.board.movePiece(piece, posTo);
              hasMoved = true;
            }
          }
        } else {
          if (piece.validateCapture(posTo)) {
            var opponentPiece = this.board.getPieceByPosition(posTo);
            this.board.removePiece(opponentPiece);
            hasMoved = true;
          }
        }
      }
    }

    return hasMoved;
  }
}

export = Chess;
