import Piece    = require('./piece');
import Position = require('../../position');

class King extends Piece {
  static name = 'King';
  static canJumpOver = false;
  hasDoneCastling: boolean;
  isInCheck: boolean;
  
  constructor(position: Position) {
    super(position);
    this.hasDoneCastling = false;
    this.isInCheck = false;
  }
  
  validateMove(position: Position) {
    var posDiff = this.getPositionDiff(position);
    
    return !!((posDiff.x != 0 || posDiff.y != 0) &&
      Math.abs(posDiff.x) <= 1 && Math.abs(posDiff.y) <= 1);
  }
  
  canDoCastling() {
    return !this.hasDoneCastling && !this.hasMoved;
  }
}

export = King;
