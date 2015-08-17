import Piece    = require('./piece');
import Position = require('../../position');

class Queen extends Piece {
  static name = 'Queen';
  static canJumpOver = false;
  
  validateMove(position: Position) {
    var posDiff = this.getPositionDiff(position);
    
    return !!((posDiff.x != 0 || posDiff.y != 0) ||
      (Math.abs(posDiff.x) == Math.abs(posDiff.y)) ||
      (posDiff.x == 0 && posDiff.y != 0) ||
      (posDiff.y == 0 && posDiff.x != 0)); 
  }
}

export = Queen;
