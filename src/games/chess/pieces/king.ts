import Piece    = require('./piece');
import Position = require('../../position');

class King extends Piece {
  static name = 'King';
  static canJumpOver = false;
  hasDoneCastling: boolean;
  inCheck: boolean;
  
  constructor(position: Position) {
    super(position);
    this.hasDoneCastling = false;
    this.inCheck = false;
  }
  
  validateMove(position: Position) {
    var posDiff = this.getPositionDiff(position);
    
    return !!((posDiff.x != 0 || posDiff.y != 0) &&
      Math.abs(posDiff.x) <= 1 && Math.abs(posDiff.y) <= 1);
  }
  
  canDoCastling() {
    return !this.hasDoneCastling && !this.hasMoved;
  }
  
  isPositionInCheck(position: Position) {
    var opponent, opponentPieces, inCheck = false;

    opponent = this.board.game.getFirstOpponent(this.player);
    opponentPieces = opponent.getPieces();
    this.inCheck = false;
    
    for (var i = 0; i < opponentPieces.length; i++) {
      if (opponent.validateCapture(this._position)) {
        this.inCheck = true;
      }
    }
    
    return this.inCheck;
  }
  
  isInCheck() {
    this.inCheck = this.isPositionInCheck(this.position);
    
    return this.inCheck;
  }
  
  isInCheckMate() {
    var positions = [], posCoords, checkCounter = 0;
    
    if (!this.isInCheck()) {
      return false;
    }
    
    posCoords = [
      [-1,  1],
      [ 0,  1],
      [ 1,  1],
      [-1,  0],
      [ 1,  0],
      [-1, -1],
      [ 0, -1],
      [ 1, -1]
    ];
    
    for (var i = 0; i < posCoords.length; i++) {
      var position = {
        x: this.position.x + posCoords[i][0],
        y: this.position.y + posCoords[i][1]
      };
      
      if (this.board.isInRange(position) &&
      this.board.getPieceByPosition(position) === null &&
      !this.isPositionInCheck(position)) {
        return false;
      }
    }
    
    return true;
  }
}

export = King;
